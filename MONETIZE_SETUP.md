# 収益化セットアップ手順書

## ① Google AdSense（広告収入）

### STEP 1：サイトを公開する
AdSense申請にはURLが必要です。先にサイトを公開してください。

**おすすめホスティング（無料）：**
- **GitHub Pages**（github.com → リポジトリ作成 → Settings → Pages）
- **Netlify**（netlify.com → GitHubと連携してドラッグ＆ドロップでデプロイ）

独自ドメインは取得しておくと審査が通りやすい（例: `japan-hiking-guide.com`）
- お名前.com / Google Domains で年1,000〜2,000円

---

### STEP 2：AdSense申請
1. https://www.google.com/adsense/ にアクセス
2. Googleアカウントでログイン → 「利用開始」
3. サイトURL・メールアドレスを入力
4. 審査用コード（`<script>`タグ）を `index.html` の `<head>` 内に貼る：

```html
<!-- Google AdSense 審査用コード（<head>内に貼る） -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-【あなたのID】"
     crossorigin="anonymous"></script>
```

5. 審査完了まで数日〜2週間待つ

---

### STEP 3：承認後の広告設置

承認後、各ページのAdSenseスペースに以下を挿入：

**サイドバー（300×250）：**
```html
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-【あなたのID】"
     data-ad-slot="【スロットID】"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

**記事中インフィード（レスポンシブ）：**
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-【あなたのID】"
     data-ad-slot="【スロットID】"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

**挿入場所（各コースページ）：**
- `<!-- Google AdSense コードをここに挿入 -->` のコメント箇所
- コース本文内の途中（h2見出しの直後）

---

## ② Amazonアソシエイト（商品アフィリエイト）

### 登録手順
1. https://affiliate.amazon.co.jp/ にアクセス
2. Amazonアカウントでログイン → 登録申請
3. サイトURL・概要・目的を入力
4. 審査通過後、商品リンクを生成

### リンク生成方法
1. Amazon.co.jpで対象商品のページを開く
2. ページ上部に表示される「SiteStripe」バーから「テキスト」または「画像+テキスト」をコピー
3. `href="#"` の部分をアソシエイトリンクに差し替える

**差し替え対象ファイル：**
```
gear/shoes.html  → 各商品のbtn-amazon href="#"
gear/index.html  → 予算別カードのhref="#"
```

**注意：**
- 申請から180日以内に3件以上の成約が必要（未達成で自動退会）
- 「アフィリエイトリンクを含む」旨をページに表示する（privacy.html に記載済み）

---

## ③ 楽天アフィリエイト（宿泊・旅行・商品）

### 登録手順
1. https://affiliate.rakuten.co.jp/ にアクセス
2. 楽天IDでログイン → 申請（審査なし・即利用可能）
3. 楽天市場・楽天トラベルの商品リンクを生成

### 楽天トラベル（宿泊リンク）の作り方
1. 楽天アフィリエイト管理画面 → 「リンク作成」
2. 「楽天トラベル」で目的地を検索
3. 生成されたリンクを `btn-hotel` の `href="#"` に差し替える

**差し替え対象ファイル：**
```
regions/kanto/takao.html   → 高尾山温泉・八王子ホテルの href="#"
regions/chubu/fuji.html    → 河口湖ホテルの href="#"
regions/kyushu/yakushima.html → 屋久島ホテルの href="#"
```

**収益目安：**
- 宿泊1件成約：紹介料1〜2%（1万円の宿泊 → 100〜200円）
- 商品1件：1〜3%

---

## ④ その他アフィリエイトASP（高単価案件）

### A8.net（エーハチ）
- https://www.a8.net/
- アウトドアブランド・旅行・保険など高単価案件が豊富
- 登録無料・審査なし

**おすすめ案件（ハイキングサイト向け）：**
| 案件 | 報酬目安 |
|------|---------|
| モンベルオンラインショップ | 購入額の2〜4% |
| じゃらんnet | 宿泊代の1〜2% |
| ふるさと納税サイト | 成約1件：1,000〜3,000円 |
| クレジットカード発行 | 1件：5,000〜20,000円 |

### バリューコマース
- https://www.valuecommerce.ne.jp/
- Yahooショッピング・一休.com等の案件あり

---

## ⑤ Google Analytics（アクセス解析）の設定

### 設定手順
1. https://analytics.google.com/ にアクセス
2. プロパティ作成 → 測定IDを取得（G-XXXXXXXXXX）
3. 全ページの `<head>` 内に追加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-【あなたのID】"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-【あなたのID】');
</script>
```

**一括挿入のコツ：** `</head>` の直前に入れる。全HTMLファイルに追加が必要。

---

## ⑥ 収益化チェックリスト

- [ ] サイト公開（GitHub Pages / Netlify）
- [ ] 独自ドメイン取得・設定
- [ ] Google Analytics 設置
- [ ] Google Search Console 登録・サイトマップ送信
- [ ] AdSense 申請コード挿入
- [ ] AdSense 審査通過 → 広告コード全ページ挿入
- [ ] Amazonアソシエイト登録 → 商品リンク差し替え
- [ ] 楽天アフィリエイト登録 → 宿泊リンク差し替え
- [ ] A8.net 登録 → 高単価案件の申請
- [ ] お問い合わせフォーム（Googleフォーム）作成・埋め込み
- [ ] プライバシーポリシー公開確認
- [ ] サイトマップXML作成・Google Search Consoleに送信

---

## ⑦ 月間PV別 収益シミュレーション

| 月間PV | AdSense | アフィリエイト | 合計目安 |
|--------|---------|-------------|---------|
| 5,000PV | 2,500円 | 3,000円 | 約5,500円 |
| 1万PV | 5,000円 | 8,000円 | 約1.3万円 |
| 3万PV | 15,000円 | 30,000円 | 約4.5万円 |
| 10万PV | 50,000円 | 120,000円 | 約17万円 |
| 30万PV | 150,000円 | 400,000円 | 約55万円 |

※装備ページのアフィリエイト成約率が高いため、ハイキングサイトはPV単価が高め。
