import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Star,
  Trophy,
  TrendingUp,
  Plus,
  Filter,
  Bell,
  Flame,
  ChevronRight,
} from "lucide-react";

const initialPosts = [
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

const categoryStyles = {
  AI活用: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  自動化: "bg-cyan-100 text-cyan-700 border-cyan-200",
  業務改善: "bg-emerald-100 text-emerald-700 border-emerald-200",
  その他: "bg-slate-100 text-slate-700 border-slate-200",
};

const currentUser = {
  name: "あなた",
  team: "FD推進部",
  avatar: "あ",
};

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{sub}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div>
      </div>
    </div>
  );
}

function Avatar({ label, className = "" }) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-sm font-bold text-white shadow ${className}`}
    >
      {label}
    </div>
  );
}

export default function DXPortalMockup() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortMode, setSortMode] = useState("latest");
  const [composer, setComposer] = useState({
    title: "",
    category: "AI活用",
    content: "",
    tags: "",
  });

  const leaderboard = useMemo(() => {
    const scoreMap = posts.reduce((acc, post) => {
      const points = post.likes * 10;
      if (!acc[post.author]) {
        acc[post.author] = {
          author: post.author,
          team: post.team,
          avatar: post.avatar,
          points: 0,
          posts: 0,
          likes: 0,
        };
      }
      acc[post.author].points += points;
      acc[post.author].posts += 1;
      acc[post.author].likes += post.likes;
      return acc;
    }, {});

    return Object.values(scoreMap).sort((a, b) => b.points - a.points);
  }, [posts]);

  const totalLikes = useMemo(() => posts.reduce((sum, p) => sum + p.likes, 0), [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = posts.filter((post) => {
      const matchedCategory = selectedCategory === "すべて" || post.category === selectedCategory;
      const haystack = [
        post.title,
        post.content,
        post.author,
        post.team,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return matchedCategory && (!q || haystack.includes(q));
    });

    if (sortMode === "popular") {
      list = [...list].sort((a, b) => b.likes - a.likes);
    } else {
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [posts, search, selectedCategory, sortMode]);

  const categories = ["すべて", "AI活用", "自動化", "業務改善", "その他"];

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;
        const delta = post.likedByMe ? -1 : 1;
        return {
          ...post,
          likes: Math.max(0, post.likes + delta),
          likedByMe: !post.likedByMe,
        };
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!composer.title.trim() || !composer.content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      team: currentUser.team,
      avatar: currentUser.avatar,
      title: composer.title.trim(),
      category: composer.category,
      content: composer.content.trim(),
      tags: composer.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      likedByMe: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setComposer({ title: "", category: "AI活用", content: "", tags: "" });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_25%),radial-gradient(circle_at_top_left,_rgba(168,85,247,0.12),_transparent_25%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[28px] border border-white/60 bg-slate-900 text-white shadow-2xl"
        >
          <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                DX情報共有ポータル / 社内モックアップ
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
                社員の知見が集まり、
                <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent"> いいね </span>
                で価値が見えるDXポータル
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                業務改善事例、AI活用メモ、自動化ノウハウを気軽に投稿。共感や参考になった投稿には「いいね」を送り、投稿者にはポイントが蓄積される設計です。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-lg transition hover:translate-y-[-1px]">
                  <Plus className="h-4 w-4" />
                  新しく投稿する
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15">
                  <Bell className="h-4 w-4" />
                  注目トピックを見る
                </button>
              </div>
            </div>

            <div className="grid gap-3 self-end sm:grid-cols-3 md:grid-cols-1">
              <StatCard
                icon={<TrendingUp className="h-5 w-5" />}
                label="累計投稿"
                value={posts.length}
                sub="社内DXの知見が増加中"
              />
              <StatCard
                icon={<Heart className="h-5 w-5" />}
                label="総いいね"
                value={totalLikes}
                sub="いいね 1件 = 10pt 加算"
              />
              <StatCard
                icon={<Trophy className="h-5 w-5" />}
                label="トップ投稿者"
                value={leaderboard[0] ? `${leaderboard[0].points}pt` : "0pt"}
                sub={leaderboard[0] ? `${leaderboard[0].author} さん` : "まだデータがありません"}
              />
            </div>
          </div>
        </motion.header>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr_0.72fr]">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">投稿する</h2>
                <p className="mt-1 text-sm text-slate-500">小さな改善でも歓迎。社内で再利用できる知見を残しましょう。</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                投稿者: {currentUser.name} / {currentUser.team}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.6fr]">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">タイトル</label>
                  <input
                    value={composer.title}
                    onChange={(e) => setComposer((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="例: 問い合わせ一次対応をAIで半自動化"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">カテゴリ</label>
                  <select
                    value={composer.category}
                    onChange={(e) => setComposer((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  >
                    <option>AI活用</option>
                    <option>自動化</option>
                    <option>業務改善</option>
                    <option>その他</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">内容</label>
                <textarea
                  rows={6}
                  value={composer.content}
                  onChange={(e) => setComposer((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="取り組み内容、使ったツール、効果、注意点などを自由に記入してください。"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">タグ（カンマ区切り）</label>
                <input
                  value={composer.tags}
                  onChange={(e) => setComposer((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="例: 生成AI, FAQ, 業務改善"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">投稿後は一覧の先頭に表示されます。モックのため、データは画面内のみ保持されます。</p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-slate-800"
                >
                  <Send className="h-4 w-4" />
                  投稿する
                </button>
              </div>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">投稿フィード</h2>
                  <p className="mt-1 text-sm text-slate-500">社内のDXナレッジを検索・閲覧できます。</p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  <Filter className="h-4 w-4" />
                  表示: {filteredPosts.length} 件
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="タイトル・本文・タグ・投稿者で検索"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                >
                  <option value="latest">新着順</option>
                  <option value="popular">人気順</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        active
                          ? "bg-slate-900 text-white shadow"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <Avatar label={post.avatar} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-slate-900">{post.author}</span>
                        <span className="text-sm text-slate-500">{post.team}</span>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            categoryStyles[post.category] || categoryStyles["その他"]
                          }`}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">{post.createdAt}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{post.content}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                              post.likedByMe
                                ? "bg-rose-50 text-rose-600"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${post.likedByMe ? "fill-current" : ""}`} />
                            {post.likes} いいね
                          </button>
                          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments} コメント
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
                          <Star className="h-4 w-4" />
                          この投稿の獲得ポイント: {post.likes * 10}pt
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}

              {filteredPosts.length === 0 && (
                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-base font-medium text-slate-700">該当する投稿が見つかりませんでした</p>
                  <p className="mt-2 text-sm text-slate-500">検索条件やカテゴリを変えてみてください。</p>
                </div>
              )}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-6"
          >
            <section className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">ランキング</h2>
                  <p className="mt-1 text-sm text-slate-500">いいね数に応じてポイントを集計</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-2 text-amber-600">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.author}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-semibold ${
                      index === 0
                        ? "bg-amber-100 text-amber-700"
                        : index === 1
                        ? "bg-slate-200 text-slate-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar label={user.avatar} className="h-10 w-10 rounded-xl text-xs" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{user.author}</p>
                      <p className="text-xs text-slate-500">{user.team}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{user.points}pt</p>
                      <p className="text-xs text-slate-500">{user.likes} いいね</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">注目トピック</h2>
                  <p className="mt-1 text-sm text-slate-500">最近よく見られているテーマ</p>
                </div>
                <div className="rounded-2xl bg-rose-50 p-2 text-rose-600">
                  <Flame className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { label: "生成AIの社内利用ルール", count: "24投稿" },
                  { label: "Power Automate テンプレート", count: "16投稿" },
                  { label: "Excel業務の標準化", count: "11投稿" },
                ].map((topic) => (
                  <button
                    key={topic.label}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-200 hover:bg-sky-50/40"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{topic.label}</p>
                      <p className="mt-1 text-xs text-slate-500">{topic.count}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200/70 bg-slate-900 p-5 text-white shadow-xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
                <Star className="h-4 w-4" />
                ポイント設計の例
              </p>
              <h3 className="mt-4 text-lg font-semibold">モックでのルール</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                <li>• いいね 1件ごとに投稿者へ 10pt 加算</li>
                <li>• ランキングは投稿単位ではなく投稿者単位で集計</li>
                <li>• 後でバッジ、月次表彰、部門対抗の拡張も可能</li>
              </ul>
              <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:translate-y-[-1px]">
                仕様メモを見る
                <ChevronRight className="h-4 w-4" />
              </button>
            </section>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
