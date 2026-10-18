// Builds test.html: index.html with fetch stubbed to a canned AI answer (8 threats + 2 opportunities),
// then auto-loads the example project and generates. Also writes check.js for a syntax check,
// and logs the prompts the page would send.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x => x[1]);
fs.writeFileSync(path.join(dir, 'check.js'), scripts.join('\n;\n'));

const risks = [];
for (let i = 1; i <= 8; i++) risks.push({ id: i, type: 'threat', category: 'Resource', description: 'Threat number ' + i, likelihood: ['High','Medium','Low'][i % 3], consequence: ['High','Medium','Low'][(i + 1) % 3], root_cause: 'cause', mitigation: 'mitigate ' + i });
risks.push({ id: 9, type: 'opportunity', category: 'Technical', description: 'Reuse screening results from earlier locations to cut assessment effort', likelihood: 'Medium', consequence: 'High', root_cause: 'Earlier audits cover similar pipelines', mitigation: 'Build a screening template in week 1' });
risks.push({ id: 10, type: 'opportunity', category: 'Stakeholder', description: 'Follow-on scope for remaining sites', likelihood: 'Low', consequence: 'Medium', root_cause: 'Gold customer', mitigation: 'Propose framework extension at mid-project review' });
const answer = JSON.stringify({ content: [{ type: 'text', text: 'Here is the register:\n' + JSON.stringify({ risks }) }] });

const stub = `<style>*{transition:none!important;animation:none!important}</style><script>
window.__sent = null;
window.fetch = async (url, opts) => { window.__sent = JSON.parse(opts.body); return { ok: true, status: 200, json: async () => (${answer}) }; };
window.addEventListener('load', () => setTimeout(async () => {
  document.querySelector('[onclick*="loadExample"]')?.click();
  await generateRiskAssessment();
  const pre = document.createElement('pre'); pre.id = 'sent-prompt'; pre.style.display = 'none';
  pre.textContent = window.__sent.system + '\\n=====USER=====\\n' + window.__sent.user;
  document.body.appendChild(pre);
  document.body.setAttribute('data-test-done', exportCsvText());
  document.body.setAttribute('data-sw', document.documentElement.scrollWidth + '/' + window.innerWidth);
  try { parent.postMessage('sw:' + document.documentElement.scrollWidth + '/' + window.innerWidth, '*'); } catch (e) {}
}, 300));
function exportCsvText() {
  const headers = T('csv.headers');
  return headers.join(',') + ' | ' + risks.filter(isOpp).map(r => r.id + ':' + r.type).join(';');
}
</script>`;
fs.writeFileSync(path.join(dir, 'test.html'), html.replace('</body>', stub + '</body>'));
console.log('scripts', scripts.length);
