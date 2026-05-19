import { motion } from "framer-motion";
import { Bell, Heart, Plus, Sparkles, TrendingUp, Trophy } from "lucide-react";
import StatCard from "./StatCard";

export default function HeaderHero({ postsLength, totalLikes, leaderboardTop }) {
  return (
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
            value={postsLength}
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
            value={leaderboardTop ? `${leaderboardTop.points}pt` : "0pt"}
            sub={leaderboardTop ? `${leaderboardTop.author} さん` : "まだデータがありません"}
          />
        </div>
      </div>
    </motion.header>
  );
}
