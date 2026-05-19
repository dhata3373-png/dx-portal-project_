import { useMemo, useState } from "react";
import HeaderHero from "./components/HeaderHero";
import PostComposer from "./components/PostComposer";
import PostFeed from "./components/PostFeed";
import Sidebar from "./components/Sidebar";
import { categories, categoryStyles, currentUser, initialPosts } from "./data/mockPosts";

export default function App() {
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

  const totalLikes = useMemo(() => posts.reduce((sum, post) => sum + post.likes, 0), [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = posts.filter((post) => {
      const matchedCategory = selectedCategory === "すべて" || post.category === selectedCategory;
      const haystack = [post.title, post.content, post.author, post.team, ...(post.tags || [])]
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
        <HeaderHero postsLength={posts.length} totalLikes={totalLikes} leaderboardTop={leaderboard[0]} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr_0.72fr]">
          <PostComposer
            composer={composer}
            setComposer={setComposer}
            currentUser={currentUser}
            onSubmit={handleSubmit}
          />

          <PostFeed
            filteredPosts={filteredPosts}
            search={search}
            setSearch={setSearch}
            sortMode={sortMode}
            setSortMode={setSortMode}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryStyles={categoryStyles}
            onLike={handleLike}
          />

          <Sidebar leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}
