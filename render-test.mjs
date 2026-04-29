import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const raw = fs.readFileSync('content/case-studies/full/gierd-ledger.md', 'utf8');
const { content } = matter(raw);
const out = await remark().use(remarkHtml).process(content);
const html = out.toString();

// Check that key visual elements survived the markdown pass
const checks = [
  ['cs-hero (before/after panel)', html.includes('class="cs-hero"')],
  ['cs-eyebrow VII (Roman numerals)', html.includes('class="cs-eyebrow"') && html.includes('>VII<')],
  ['cs-badge inline state pills', html.includes('cs-badge cs-badge--estimated')],
  ['cs-statemachine SVG container', html.includes('class="cs-statemachine"')],
  ['SVG element rendered', html.includes('<svg viewBox="0 0 800 220"')],
  ['SVG marker defs', html.includes('<marker id="cs-arrow"')],
  ['cs-timeline strip', html.includes('class="cs-timeline"')],
  ['cs-pullquote on Key Insight', html.includes('class="cs-pullquote"')],
  ['cs-beforeafter panel', html.includes('class="cs-beforeafter"')],
];
let ok = true;
for (const [name, pass] of checks) {
  console.log((pass ? 'PASS  ' : 'FAIL  ') + name);
  if (!pass) ok = false;
}
console.log('---');
console.log('Total HTML length: ' + html.length + ' chars');
console.log(ok ? 'ALL VISUAL ELEMENTS RENDERED' : 'SOME ELEMENTS MISSING');
process.exit(ok ? 0 : 1);
