// test2.html: generate in EN (stub), switch to NO (stub translates with "[NO] " prefix),
// switch back to EN (must hit cache, no extra fetch). Results written to body[data-result].
const fs = require('fs'), path = require('path');
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, '..', 'index.html'), 'utf8');
fs.writeFileSync(path.join(dir, 'check.js'), [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x => x[1]).join('\n;\n'));
const risks = [
  { id: 1, type: 'threat', category: 'Resource', description: 'Only two specialists', likelihood: 'High', consequence: 'High', root_cause: 'Scarce competence', mitigation: 'Secure backup' },
  { id: 2, type: 'opportunity', category: 'Technical', description: 'Reuse screening', likelihood: 'Medium', consequence: 'High', root_cause: 'Earlier audits', mitigation: 'Template in week 1' },
];
const stub = `<style>*{transition:none!important;animation:none!important}</style><script>
try { localStorage.setItem('lang', 'en'); } catch (e) {}
window.__calls = [];
const GEN = ${JSON.stringify(JSON.stringify({ risks }))};
window.fetch = async (url, opts) => {
  const body = JSON.parse(opts.body); window.__calls.push(body.system.slice(0, 40));
  let text = GEN;
  if (body.system.startsWith('You translate')) {
    const snap = JSON.parse(body.user);
    for (const id in snap.items) for (const f in snap.items[id]) if (snap.items[id][f]) snap.items[id][f] = '[NO] ' + snap.items[id][f];
    text = JSON.stringify(snap);
  }
  return { ok: true, status: 200, json: async () => ({ content: [{ type: 'text', text }] }) };
};
window.addEventListener('load', () => setTimeout(async () => {
  const out = [];
  document.querySelector('[onclick*="loadExample"]')?.click();
  await generateRiskAssessment();
  out.push('EN desc=' + risks[0].description + ' lang=' + registerLang);
  out.push('genPromptHasLangRule=' + /Write all free text/.test(buildSystemPrompt()));
  setLanguage('no'); await new Promise(r => setTimeout(r, 300));
  out.push('NO desc=' + risks[0].description + ' cat=' + risks[1].category + ' lang=' + registerLang);
  out.push('NO promptHasLangRule=' + /norsk bokmål/.test(buildSystemPrompt()));
  out.push('NO tableCell=' + document.querySelector('#risk-row-1 .risk-desc div').textContent);
  setLanguage('en'); await new Promise(r => setTimeout(r, 300));
  out.push('EN-again desc=' + risks[0].description + ' calls=' + window.__calls.length);
  out.push('errVisible=' + document.getElementById('error-msg').classList.contains('visible'));
  document.body.setAttribute('data-result', out.join(' || '));
}, 300));
</script>`;
fs.writeFileSync(path.join(dir, 'test2.html'), html.replace('</body>', stub + '</body>'));
