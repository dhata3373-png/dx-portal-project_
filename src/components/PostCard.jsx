import { motion } from "framer-motion";
import { Heart, MessageSquare, Star } from "lucide-react";
import Avatar from "./Avatar";

export default function PostCard({ post, index, categoryStyles, onLike }) {
  return (
    <motion.article
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
                onClick={() => onLike(post.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 transition ${
                  post.likedByMe ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
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
  );
}
