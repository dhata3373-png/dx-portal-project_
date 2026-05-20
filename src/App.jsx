import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Upload,
  Video,
  Play,
  FileVideo,
  Clapperboard,
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
    video: {
      name: "見積フロー自動化_デモ.mp4",
      size: "48.2MB",
      duration: "02:14",
      caption: "実際の申請〜承認までの流れを2分で確認できるデモ動画です。",
      theme: "from-cyan-500 via-sky-500 to-indigo-600",
    },
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
    video: {
      name: "FAQボット回答例_画面収録.mp4",
      size: "32.6MB",
      duration: "01:36",
      caption: "社内質問に対する回答の動きと検索の精度感が分かる試作動画です。",
      theme: "from-fuchsia-500 via-violet-500 to-indigo-600",
    },
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
    video: {
      name: "請求書チェック手順紹介.mp4",
      size: "21.4MB",
      duration: "00:58",
      caption: "テンプレート入力から差異チェック完了までの手順を短くまとめています。",
      theme: "from-emerald-500 via-teal-500 to-cyan-600",
    },
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

function VideoPreview({ video }) {
  if (!video) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
      <div
        className={`relative flex min-h-[168px] items-end overflow-hidden bg-gradient-to-br ${
          video.theme || "from-sky-500 via-cyan-500 to-indigo-600"
        } p-4 text-white`}
      >
        <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          動画付き投稿
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.2),_transparent_40%)]" />
        <div className="relative flex w-full items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Clapperboard className="h-3.5 w-3.5" />
              デモ動画
            </div>
            <p className="mt-3 text-base font-semibold">{video.name}</p>
            <p className="mt-1 text-sm text-white/80">{video.caption}</p>
          </div>
          <button
            type="button"
            className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-lg transition hover:scale-105"
          >
            <Play className="ml-1 h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-slate-600">
        <div className="inline-flex items-center gap-2">
          <FileVideo className="h-4 w-4 text-slate-400" />
          <span>{video.size}</span>
        </div>
        <div className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
          {video.duration}
        </div>
      </div>
    </div>
  );
}

function ComposerModal({
  open,
  onClose,
  composer,
  setComposer,
  currentUser,
  onSubmit,
  selectedVideo,
  onVideoChange,
  onVideoClear,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/60 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  新規投稿ウィンドウ
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  DXナレッジを投稿する
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  テキストに加えて、動画付きで取り組み内容を共有できます。
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(92vh-92px)] overflow-y-auto px-6 py-6">
              <div className="mb-5 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                投稿者:{" "}
                <span className="font-medium text-slate-900">
                  {currentUser.name}
                </span>{" "}
                / {currentUser.team}
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.6fr]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      タイトル
                    </label>
                    <input
                      value={composer.title}
                      onChange={(e) =>
                        setComposer((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="例: 申請業務の自動化フロー紹介"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      カテゴリ
                    </label>
                    <select
                      value={composer.category}
                      onChange={(e) =>
                        setComposer((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
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
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    内容
                  </label>
                  <textarea
                    rows={6}
                    value={composer.content}
                    onChange={(e) =>
                      setComposer((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="取り組み内容、使ったツール、効果、注意点などを自由に記入してください。"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    タグ（カンマ区切り）
                  </label>
                  <input
                    value={composer.tags}
                    onChange={(e) =>
                      setComposer((prev) => ({
                        ...prev,
                        tags: e.target.value,
                      }))
                    }
                    placeholder="例: Power Automate, 生成AI, 標準化"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Video className="h-4 w-4 text-sky-600" />
                    動画アップロードUI
                  </div>

                  <label className="block cursor-pointer rounded-[26px] border-2 border-dashed border-sky-200 bg-sky-50/60 p-6 transition hover:border-sky-300 hover:bg-sky-50">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={onVideoChange}
                    />
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-sky-600 shadow-sm">
                        <Upload className="h-7 w-7" />
                      </div>
                      <p className="mt-4 text-base font-semibold text-slate-900">
                        動画ファイルを選択
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        mp4 / mov / webm
                        などを想定した投稿UIです（モックのため実アップロードは未接続）
                      </p>
                    </div>
                  </label>

                  {selectedVideo && (
                    <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                            <FileVideo className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {selectedVideo.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {selectedVideo.sizeLabel}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={onVideoClear}
                          className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200"
                        >
                          動画を外す
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-sm text-slate-500">
                    投稿すると一覧の先頭に追加されます。動画はモックUIとしてカード表示されます。
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      閉じる
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-slate-800"
                    >
                      <Send className="h-4 w-4" />
                      投稿する
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DXPortalMockup() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortMode, setSortMode] = useState("latest");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
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

  const totalLikes = useMemo(
    () => posts.reduce((sum, p) => sum + p.likes, 0),
    [posts]
  );
  const totalVideoPosts = useMemo(
    () => posts.filter((post) => post.video).length,
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = posts.filter((post) => {
      const matchedCategory =
        selectedCategory === "すべて" || post.category === selectedCategory;
      const haystack = [
        post.title,
        post.content,
        post.author,
        post.team,
        ...(post.tags || []),
        post.video?.name || "",
        post.video?.caption || "",
      ]
        .join(" ")
        .toLowerCase();
      return matchedCategory && (!q || haystack.includes(q));
    });

    if (sortMode === "popular") {
      list = [...list].sort((a, b) => b.likes - a.likes);
    } else {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return list;
  }, [posts, search, selectedCategory, sortMode]);

  const categories = ["すべて", "AI活用", "自動化", "業務改善", "その他"];

  const resetComposer = () => {
    setComposer({ title: "", category: "AI活用", content: "", tags: "" });
    setSelectedVideo(null);
  };

  const openComposer = () => setIsComposerOpen(true);
  const closeComposer = () => {
    setIsComposerOpen(false);
    resetComposer();
  };

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

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);
    setSelectedVideo({
      name: file.name,
      sizeLabel: `${sizeInMB.toFixed(1)}MB`,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!composer.title.trim() || !composer.content.trim()) return;

    const colorPalette = [
      "from-sky-500 via-cyan-500 to-indigo-600",
      "from-violet-500 via-fuchsia-500 to-pink-500",
      "from-emerald-500 via-teal-500 to-cyan-600",
      "from-amber-500 via-orange-500 to-rose-500",
    ];

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
      video: selectedVideo
        ? {
            name: selectedVideo.name,
            size: selectedVideo.sizeLabel,
            duration: "アップロード待ち",
            caption:
              "投稿ウィンドウから追加された動画UIです。実ファイル保存は今後の実装想定です。",
            theme: colorPalette[posts.length % colorPalette.length],
          }
        : null,
    };

    setPosts((prev) => [newPost, ...prev]);
    closeComposer();
  };

  return (
    <>
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
                  <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
                    {" "}
                    いいね{" "}
                  </span>
                  で価値が見えるDXポータル
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  業務改善事例、AI活用メモ、自動化ノウハウを気軽に投稿。共感や参考になった投稿には「いいね」を送り、投稿者にはポイントが蓄積される設計です。今回の拡張で、投稿ボタンからモーダル形式の投稿ウィンドウを開き、動画付きの投稿UIも体験できます。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openComposer}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-lg transition hover:translate-y-[-1px]"
                  >
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
                  icon={<Video className="h-5 w-5" />}
                  label="動画付き投稿"
                  value={totalVideoPosts}
                  sub="デモ・手順共有に最適"
                />
              </div>
            </div>
          </motion.header>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.72fr]">
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">投稿クイックアクション</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    新しい投稿は専用ウィンドウから入力するUIに変更しています。
                  </p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-2 text-sky-600">
                  <Clapperboard className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 rounded-[26px] border border-slate-200 bg-slate-50 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                  <Video className="h-3.5 w-3.5 text-sky-600" />
                  動画投稿対応UI
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  手順説明やデモ動画を一緒に共有
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  投稿ウィンドウでは、タイトル・内容・タグに加えて動画ファイルを選べるアップロードUIを用意。投稿一覧では動画付きカードとして表示され、現場向けのデモ共有をイメージできます。
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-900">投稿方法</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      「新しく投稿する」ボタン → モーダル起動 → テキスト入力 → 動画選択 → 投稿
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-900">想定用途</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      画面デモ、操作説明、改善前後の比較、引き継ぎ動画など
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openComposer}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:translate-y-[-1px] hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  投稿ウィンドウを開く
                </button>
              </div>
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
                    <p className="mt-1 text-sm text-slate-500">
                      社内のDXナレッジを検索・閲覧できます。動画付き投稿もカードで表示します。
                    </p>
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
                      placeholder="タイトル・本文・タグ・投稿者・動画名で検索"
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
                        type="button"
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
                          <span className="font-medium text-slate-900">
                            {post.author}
                          </span>
                          <span className="text-sm text-slate-500">
                            {post.team}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                              categoryStyles[post.category] ||
                              categoryStyles["その他"]
                            }`}
                          >
                            {post.category}
                          </span>
                          {post.video && (
                            <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                              動画あり
                            </span>
                          )}
                          <span className="text-xs text-slate-400">
                            {post.createdAt}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-slate-900">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {post.content}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <VideoPreview video={post.video} />

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <button
                              type="button"
                              onClick={() => handleLike(post.id)}
                              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                                post.likedByMe
                                  ? "bg-rose-50 text-rose-600"
                                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  post.likedByMe ? "fill-current" : ""
                                }`}
                              />
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
                    <p className="text-base font-medium text-slate-700">
                      該当する投稿が見つかりませんでした
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      検索条件やカテゴリを変えてみてください。
                    </p>
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
                    <p className="mt-1 text-sm text-slate-500">
                      いいね数に応じてポイントを集計
                    </p>
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
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-semibold ${
                          index === 0
                            ? "bg-amber-100 text-amber-700"
                            : index === 1
                            ? "bg-slate-200 text-slate-700"
                            : index === 2
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Avatar
                        label={user.avatar}
                        className="h-10 w-10 rounded-xl text-xs"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {user.author}
                        </p>
                        <p className="text-xs text-slate-500">{user.team}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {user.points}pt
                        </p>
                        <p className="text-xs text-slate-500">
                          {user.likes} いいね
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">注目トピック</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      最近よく見られているテーマ
                    </p>
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
                    { label: "動画マニュアル共有", count: "8投稿" },
                  ].map((topic) => (
                    <button
                      type="button"
                      key={topic.label}
                      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-200 hover:bg-sky-50/40"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {topic.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {topic.count}
                        </p>
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
                  <li>• 動画付き投稿も通常投稿と同様にポイント対象</li>
                </ul>
                <button
                  type="button"
                  onClick={openComposer}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:translate-y-[-1px]"
                >
                  動画付き投稿を試す
                  <ChevronRight className="h-4 w-4" />
                </button>
              </section>
            </motion.aside>
          </div>
        </div>
      </div>

      <ComposerModal
        open={isComposerOpen}
        onClose={closeComposer}
        composer={composer}
        setComposer={setComposer}
        currentUser={currentUser}
        onSubmit={handleSubmit}
        selectedVideo={selectedVideo}
        onVideoChange={handleVideoChange}
        onVideoClear={() => setSelectedVideo(null)}
      />
    </>
  );
}