import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const html = fs.readFileSync('index.html', 'utf8');
const voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const stack = [], errors = [];
for (const match of html.matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)) {
    const tag = match[1].toLowerCase();
    if (voids.has(tag)) continue;
    if (match[0].startsWith('</')) {
        const previous = stack.pop();
        if (previous !== tag) errors.push(`Closing ${tag}, expected ${previous}`);
    } else stack.push(tag);
}
if (stack.length) errors.push('Unclosed tags: ' + stack.join(', '));
const assets = new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(value => !/^(https?:|#)/.test(value)));
const css = fs.readFileSync('css/main.css', 'utf8');
for (const match of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
    if (!/^https?:/.test(match[1])) assets.add(path.join('css', match[1]));
}
if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) errors.push('CSS braces do not match');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync('js/data.js', 'utf8'), context);
function collect(value) {
    if (typeof value === 'string' && value.startsWith('images/')) assets.add(value);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
}
collect(context.window.onitsukaData);
for (const asset of assets) if (!fs.existsSync(decodeURIComponent(asset.split(/[?#]/)[0]))) errors.push('Missing asset: ' + asset);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
// Titles in inert popup templates are mounted one popup at a time.
const liveHtml = html.replace(/<template\b[\s\S]*?<\/template>/g, '');
const liveIds = [...liveHtml.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(liveIds).size !== liveIds.length) errors.push('Duplicate live element IDs');
if (!ids.includes('content')) errors.push('Missing skip navigation target');
console.log(`Checked HTML nesting, ${assets.size} local asset paths, CSS braces, element IDs and skip navigation.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('All static checks passed.');
