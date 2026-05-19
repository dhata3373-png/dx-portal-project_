import { motion } from "framer-motion";
import { ChevronRight, Flame, Star, Trophy } from "lucide-react";
import Avatar from "./Avatar";

export default function Sidebar({ leaderboard }) {
  return (
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
            <div key={user.author} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
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
  );
}
