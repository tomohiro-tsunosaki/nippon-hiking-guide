# -*- coding: utf-8 -*-
import os, glob

ADSENSE = '''  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5465505378438318"
       crossorigin="anonymous"></script>'''

files = glob.glob("**/*.html", recursive=True)
count = 0
skip = 0
for f in files:
    with open(f, encoding="utf-8") as fp:
        content = fp.read()
    if "ca-pub-5465505378438318" in content:
        skip += 1
        continue
    if "</head>" not in content:
        skip += 1
        continue
    new_content = content.replace("</head>", ADSENSE + "\n</head>", 1)
    with open(f, "w", encoding="utf-8") as fp:
        fp.write(new_content)
    count += 1
    print(f"OK: {f}")

print(f"\n挿入完了: {count}ファイル / スキップ: {skip}ファイル")
