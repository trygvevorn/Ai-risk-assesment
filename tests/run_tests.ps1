# Run: pwsh tests/run_tests.ps1   (needs Node and Edge; the API is stubbed, nothing is sent)
# Regression suite for the AI risk page (stubbed API). Prints PASS/FAIL per check and writes screenshots to .\out
$ErrorActionPreference = 'Continue'
$s = $PSScriptRoot
$node = "C:\Users\trybre\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v26.7.0-win-x64\node.exe"
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$u = "file:///$($s -replace '\\','/')"
New-Item -ItemType Directory -Force "$s\out" | Out-Null
$fail = 0
function Check($name, $ok, $detail) { if ($ok) { "PASS  $name" } else { "FAIL  $name  -> $detail"; $script:fail++ } }
function Dom($page, $w, $prof) {
    $f = "$s\out\dom_$prof.html"
    & $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=10000 "--window-size=$($w),1600" --user-data-dir="$s\prof_$prof" --dump-dom "$u/$page" 2>$null | Out-File $f -Encoding utf8
    Get-Content $f -Raw
}
function Shot($page, $w, $h, $name) {
    Start-Process $edge -ArgumentList "--headless=new","--disable-gpu","--allow-file-access-from-files","--hide-scrollbars","--virtual-time-budget=10000","--window-size=$w,$h","--screenshot=$s\out\$name.png","--user-data-dir=$s\prof_shot_$name","$u/$page" -Wait
}

& $node "$s\make_test.js" | Out-Null
& $node "$s\make_test2.js" | Out-Null
& $node --check "$s\check.js" 2>&1 | Out-Null
Check "JS syntax" ($LASTEXITCODE -eq 0) "node --check failed"

$d1 = Dom "test.html" 1440 t1
$done = [regex]::Match($d1, 'data-test-done="([^"]*)"').Groups[1].Value
Check "Generate with prose-wrapped JSON renders" ($done -ne '') "no data-test-done (generate failed?)"
Check "CSV has Type column" ($done -match '^ID,Type,') $done
Check "2 opportunities parsed" ($done -match '9:opportunity;10:opportunity') $done
$oppChips = ([regex]::Matches($d1, 'id="opp-cell-[^"]*"[^>]*>(?:(?!</div>\s*<div class="matrix).)*?risk-chip opportunity')).Count
Check "Opportunity chips only in opportunity matrix" (($d1 -notmatch 'id="cell-[^"]*"[^>]*><div class="risk-chip opportunity') -and ($d1 -match 'id="opp-cell-medium-high"[^>]*><div class="risk-chip opportunity')) "chip placement wrong"
Check "Summary counts threats and opportunities separately" ($d1 -match '8 threats · 2 opportunities') "summary text missing"
Check "Priority shows description and group headers" (($d1 -match 'priority-group threat') -and ($d1 -match 'priority-group opportunity') -and ($d1 -match 'priority-risk-name">Threat number')) "priority markup"
Check "Opportunity ranks restart at 1" ($d1 -match 'priority-group opportunity[^<]*</div><div class="priority-item"[^>]*>\s*<div class="priority-rank opportunity">1<') "rank does not restart"
Check "No error shown" ($d1 -notmatch 'class="error-message visible"') "error visible"

$d2 = Dom "test2.html" 1440 t2
$res = [regex]::Match($d2, 'data-result="([^"]*)"').Groups[1].Value
Check "NO view translates register" ($res -match 'NO desc=\[NO\] Only two specialists') $res
Check "Prompts carry language rule" (($res -match 'genPromptHasLangRule=true') -and ($res -match 'NO promptHasLangRule=true')) $res
Check "Switch back uses cache (2 API calls)" ($res -match 'EN-again desc=Only two specialists calls=2') $res
Check "No error after language switches" ($res -match 'errVisible=false') $res

$dm = Dom "mobil.html" 600 m
$sw = [regex]::Match($dm, 'data-sw="sw:(\d+)/(\d+)"')
Check "Mobile 390px: no horizontal page scroll" ($sw.Success -and [int]$sw.Groups[1].Value -le [int]$sw.Groups[2].Value) $sw.Value

Shot "test.html" 1440 2600 desktop
Shot "mobil.html" 600 2400 mobile
""
if ($fail -eq 0) { "ALL PASS" } else { "$fail FAILED" }
