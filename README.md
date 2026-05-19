# DX情報共有ポータル（React + Vite）

社内向けDX情報共有ポータルのモックアップです。社員が知見を投稿でき、投稿に「いいね」を付けると投稿者にポイントが加算されるUIを実装しています。

## 主な機能

- 投稿フォーム（タイトル / カテゴリ / 内容 / タグ）
- 投稿一覧表示
- 検索 / カテゴリ絞り込み / 新着順・人気順ソート
- いいね機能
- 投稿者ごとのポイントランキング
- モダンなカードUI

## 使用技術

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで以下を開きます。

```
http://localhost:5173
```

## ビルド

```bash
npm run build
npm run preview
```

## ディレクトリ構成

```
dx-portal-project/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ src/
   ├─ App.jsx
   ├─ main.jsx
   ├─ index.css
   ├─ data/
   │  └─ mockPosts.js
   └─ components/
      ├─ Avatar.jsx
      ├─ HeaderHero.jsx
      ├─ PostComposer.jsx
      ├─ PostFeed.jsx
      ├─ PostCard.jsx
      ├─ Sidebar.jsx
      └─ StatCard.jsx
```

## 備考

- 現在はフロントエンドのモックアップです。
- データは画面内のstateのみで保持され、リロードで初期化されます。
- 将来的に Microsoft Entra ID、SharePoint、Dataverse、Firebase などと連携可能です。
