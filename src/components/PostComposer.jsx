import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function PostComposer({ composer, setComposer, currentUser, onSubmit }) {
  return (
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

      <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
