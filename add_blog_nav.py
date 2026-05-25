import os
import re

BASE = r'C:\Users\user\hiking-site'

# blog pages don't need a blog nav link (they are the blog)
SKIP = {'blog'}

def get_blog_prefix(rel_path):
    """Return relative prefix to reach root from this file's directory."""
    parts = rel_path.replace('\\', '/').split('/')
    depth = len(parts) - 1  # number of directory levels
    if depth == 0:
        return ''
    return '../' * depth

results = {'updated': [], 'skipped': []}

for root, dirs, files in os.walk(BASE):
    # skip hidden dirs and node_modules
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(root, fname)
        rel = os.path.relpath(fpath, BASE)
        top_dir = rel.split(os.sep)[0]
        if top_dir in SKIP:
            results['skipped'].append(rel)
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if no nav-gear (no global nav) or already has blog link in nav
        if 'nav-gear' not in content:
            continue
        # Check if blog link already in the nav block
        nav_match = re.search(r'<nav class="global-nav">(.*?)</nav>', content, re.DOTALL)
        if not nav_match:
            continue
        nav_block = nav_match.group(0)
        if 'blog/' in nav_block or 'ブログ' in nav_block:
            results['skipped'].append(rel)
            continue

        prefix = get_blog_prefix(rel)
        blog_link = f'<li><a href="{prefix}blog/beginner-gear.html">ブログ</a></li>'

        # Insert after the nav-gear </li>
        # Match regardless of text content (handles HTML entities too)
        new_nav = re.sub(
            r'(<li><a [^>]*class="nav-gear"[^>]*>.*?</a></li>)',
            r'\1\n        ' + blog_link,
            nav_block
        )
        if new_nav == nav_block:
            results['skipped'].append(rel)
            continue

        new_content = content.replace(nav_block, new_nav)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        results['updated'].append(rel)

print(f"Updated {len(results['updated'])} files:")
for p in sorted(results['updated']):
    print(f"  + {p}")
print(f"\nSkipped {len(results['skipped'])} files.")
