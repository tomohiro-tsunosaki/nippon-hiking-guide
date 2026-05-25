# -*- coding: utf-8 -*-
import os, glob, re

OLD = "https://tomohiro-tsunosaki.github.io/nippon-hiking-guide"
NEW = "https://nippon-hiking-guide.com"

files = glob.glob("**/*.html", recursive=True)
count = 0
for f in files:
    with open(f, encoding="utf-8") as fp:
        content = fp.read()
    if OLD in content:
        new_content = content.replace(OLD, NEW)
        with open(f, "w", encoding="utf-8") as fp:
            fp.write(new_content)
        count += 1
        print(f"Updated: {f}")

print(f"\n{count}ファイルを更新しました")
