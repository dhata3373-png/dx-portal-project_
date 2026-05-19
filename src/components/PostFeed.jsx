import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import PostCard from "./PostCard";

export default function PostFeed({
  filteredPosts,
  search,
  setSearch,
  sortMode,
  setSortMode,
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryStyles,
  onLike,
}) {
  return (
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
                  active ? "bg-slate-900 text-white shadow" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
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
          <PostCard
            key={post.id}
            post={post}
            index={index}
            categoryStyles={categoryStyles}
            onLike={onLike}
          />
        ))}

        {filteredPosts.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-base font-medium text-slate-700">該当する投稿が見つかりませんでした</p>
            <p className="mt-2 text-sm text-slate-500">検索条件やカテゴリを変えてみてください。</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
