const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/user/hiking-site';

// Map: card-title text -> filename
const linkMap = {
  // 北海道
  '羊蹄山（虻田）': 'youteizan.html',
  '利尻山（利尻）': 'rishirizan.html',
  '十勝岳（上川）': 'tokachidake.html',
  'ニセコ・ワイスホルン（倶知安）': 'niseko.html',
  // 東北
  '八甲田山（青森）': 'hakkodasan.html',
  '安達太良山（福島）': 'adatarasan.html',
  '秋田駒ヶ岳（秋田）': 'akitakomadake.html',
  '岩手山（岩手）': 'iwateyama.html',
  '月山（山形）': 'gassan.html',
  // 関東
  '大山（神奈川）': 'oyama.html',
  '御岳山（東京）': 'mitakesan.html',
  '丹沢山（神奈川）': 'tanzawasan.html',
  '雲取山（東京・埼玉）': 'kumotoriyama.html',
  // 中部
  '乗鞍岳（長野・岐阜）': 'norikuradake.html',
  '御嶽山（長野・岐阜）': 'ontakesan.html',
  '白山（石川）': 'hakusan.html',
  // 近畿
  '大台ヶ原（奈良）': 'odaigahara.html',
  '金剛山（奈良・大阪）': 'kongosan.html',
  '比叡山（滋賀・京都）': 'hieizan.html',
  '大峰山（奈良）': 'omineyama.html',
  // 中国
  '吾妻山（広島）': 'azumayama.html',
  '三瓶山（島根）': 'sanbesan.html',
  '恐羅漢山（広島）': 'korouhanzan.html',
  '道後山（広島・鳥取）': 'dogoyama.html',
  '比婆山（広島）': 'hibayama.html',
  // 四国
  '剣山（徳島）': 'tsurugizan.html',
  '三嶺（高知・徳島）': 'sanrei.html',
  '寒霞渓（香川）': 'kankakei.html',
  '筒上山（高知）': 'tsutsugazan.html',
  '東赤石山（愛媛）': 'higashiakaishi.html',
  // 九州
  '九重山（大分）': 'kujusan.html',
  '開聞岳（鹿児島）': 'kaimonodake.html',
  '雲仙岳（長崎）': 'unzendake.html',
  '祖母山（大分・宮崎）': 'sobozan.html',
};

const indexFiles = [
  'regions/hokkaido/index.html',
  'regions/tohoku/index.html',
  'regions/kanto/index.html',
  'regions/chubu/index.html',
  'regions/kinki/index.html',
  'regions/chugoku/index.html',
  'regions/shikoku/index.html',
  'regions/kyushu/index.html',
];

const btnPattern = '<span class="btn-course" style="color:#aaa;cursor:default;pointer-events:none;background:#f0f0f0;box-shadow:none;border:1px solid #ddd;">近日公開</span>';

let totalReplaced = 0;

for (const relPath of indexFiles) {
  const fp = path.join(BASE, relPath);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = 0;

  for (const [title, filename] of Object.entries(linkMap)) {
    // Find the card-title div with this title, then replace the 近日公開 span that follows
    const titlePattern = `<div class="card-title">${title}</div>`;
    const idx = html.indexOf(titlePattern);
    if (idx === -1) continue;

    // Find the 近日公開 span after this title (within next 300 chars)
    const afterTitle = html.indexOf(btnPattern, idx);
    if (afterTitle === -1 || afterTitle - idx > 400) continue;

    const newBtn = `<a href="${filename}" class="btn-course">詳しく見る →</a>`;
    html = html.substring(0, afterTitle) + newBtn + html.substring(afterTitle + btnPattern.length);
    console.log(`  ${relPath}: ${title} → ${filename}`);
    changed++;
    totalReplaced++;
  }

  if (changed > 0) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`Saved: ${relPath} (${changed} replaced)`);
  }
}

console.log(`\nTotal replaced: ${totalReplaced}`);

// Verify no 近日公開 remain
let remaining = 0;
for (const relPath of indexFiles) {
  const fp = path.join(BASE, relPath);
  const html = fs.readFileSync(fp, 'utf8');
  const count = (html.match(/近日公開/g) || []).length;
  if (count > 0) {
    console.log(`REMAINING: ${relPath} has ${count} 近日公開`);
    remaining += count;
  }
}
if (remaining === 0) console.log('✓ No 近日公開 remaining in index files');
