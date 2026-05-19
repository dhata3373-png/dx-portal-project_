export const initialPosts = [
  {
    id: 1,
    author: "田中 未来",
    team: "営業企画",
    avatar: "田",
    title: "見積作成フローを自動化して月12時間削減",
    category: "自動化",
    content:
      "Power Automate と SharePoint を使って、見積依頼から承認までの流れを自動化。手戻りも減って、営業からの満足度も高かったです。設定手順を社内向けに整理したので興味ある方はコメントください。",
    tags: ["Power Automate", "SharePoint", "営業DX"],
    likes: 18,
    comments: 6,
    createdAt: "2026-05-15",
    likedByMe: false,
  },
  {
    id: 2,
    author: "佐藤 匠",
    team: "人事",
    avatar: "佐",
    title: "社内FAQチャットボットの試作メモ",
    category: "AI活用",
    content:
      "社内規程や申請フローを回答できるFAQボットを試作しました。問い合わせの一次対応を減らす目的です。精度改善のため、まずは想定質問の整備が重要でした。",
    tags: ["生成AI", "FAQ", "ナレッジ管理"],
    likes: 26,
    comments: 11,
    createdAt: "2026-05-12",
    likedByMe: true,
  },
  {
    id: 3,
    author: "高橋 彩",
    team: "経理",
    avatar: "高",
    title: "請求書チェックを半自動化したテンプレート共有",
    category: "業務改善",
    content:
      "Excel テンプレートと簡単なルール設定で、請求書の差異チェックを標準化。担当者ごとのばらつきが減り、確認時間も短縮できました。",
    tags: ["Excel", "経理", "標準化"],
    likes: 9,
    comments: 3,
    createdAt: "2026-05-10",
    likedByMe: false,
  },
];

export const categories = ["すべて", "AI活用", "自動化", "業務改善", "その他"];

export const categoryStyles = {
  AI活用: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  自動化: "bg-cyan-100 text-cyan-700 border-cyan-200",
  業務改善: "bg-emerald-100 text-emerald-700 border-emerald-200",
  その他: "bg-slate-100 text-slate-700 border-slate-200",
};

export const currentUser = {
  name: "あなた",
  team: "FD推進部",
  avatar: "あ",
};
