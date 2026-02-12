"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";

const feedPosts = [
  {
    username: "freshroast_co",
    handle: "@freshroast",
    avatar: "FR",
    avatarBg: "from-orange-500 to-red-500",
    time: "2m",
    content: "Just hit 10K followers in 30 days 🚀 SA Telecoms changed the game for us. Our engagement is through the roof!",
    likes: 847,
    comments: 63,
    shares: 124,
    type: "text" as const,
  },
  {
    username: "luxe_beauty",
    handle: "@luxebeauty",
    avatar: "LB",
    avatarBg: "from-pink-500 to-purple-500",
    time: "8m",
    content: "Our latest campaign results are INSANE. 320% increase in reach. This is what real social media management looks like 💅",
    likes: 2341,
    comments: 189,
    shares: 456,
    type: "image" as const,
    imageGradient: "from-pink-600/30 via-purple-600/30 to-blue-600/30",
    stockImage: "/instagram-city.jpg",
  },
  {
    username: "techstart_io",
    handle: "@techstart",
    avatar: "TS",
    avatarBg: "from-blue-500 to-cyan-500",
    time: "15m",
    content: "From 200 followers to 25K in 3 months. SA Telecoms doesn't just manage — they GROW. Best investment we made this year.",
    likes: 1523,
    comments: 97,
    shares: 312,
    type: "text" as const,
  },
  {
    username: "fitzone_gym",
    handle: "@fitzone",
    avatar: "FZ",
    avatarBg: "from-green-500 to-emerald-500",
    time: "22m",
    content: "New member signups up 5x since we started with SA Telecoms. Social media is our #1 lead channel now 💪",
    likes: 956,
    comments: 72,
    shares: 198,
    type: "video" as const,
    imageGradient: "from-green-600/30 via-teal-600/30 to-cyan-600/30",
    stockImage: "/app-icons-grid.jpg",
  },
  {
    username: "urban_eats",
    handle: "@urbaneats",
    avatar: "UE",
    avatarBg: "from-yellow-500 to-orange-500",
    time: "34m",
    content: "Our TikTok went viral — 2.3M views! 🔥 The content strategy from SA Telecoms is next level. Bookings are FULL for the next 2 weeks.",
    likes: 4210,
    comments: 341,
    shares: 892,
    type: "image" as const,
    imageGradient: "from-yellow-600/30 via-orange-600/30 to-red-600/30",
    stockImage: "/social-platforms-blue.jpg",
  },
  {
    username: "nova_fashion",
    handle: "@novafashion",
    avatar: "NF",
    avatarBg: "from-violet-500 to-fuchsia-500",
    time: "41m",
    content: "Ad spend ROI: 8.2x return. SA Telecoms set up our entire paid advertising pipeline. We went from guessing to growing 📈",
    likes: 1876,
    comments: 145,
    shares: 267,
    type: "text" as const,
  },
];

function FeedCard({ post, index }: { post: typeof feedPosts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-surface/80 backdrop-blur-xl border border-surface-border rounded-2xl p-5 cursor-pointer hover:border-neon-blue/30 transition-colors group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
            {post.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white">{post.username}</span>
              <svg className="w-3.5 h-3.5 text-neon-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">{post.handle} · {post.time}</span>
          </div>
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <p className="text-sm text-gray-300 leading-relaxed mb-3">{post.content}</p>

      {/* Image/Video */}
      {(post.type === "image" || post.type === "video") && (
        <div className={`relative w-full h-44 rounded-xl bg-gradient-to-br ${post.imageGradient} mb-3 overflow-hidden`}>
          {(post as { stockImage?: string }).stockImage && (
            <Image
              src={(post as { stockImage?: string }).stockImage!}
              alt="Post content"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {post.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-border/50">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-neon-pink transition-colors group/btn">
            <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs">{post.likes.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-neon-blue transition-colors group/btn">
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-neon-green transition-colors group/btn">
            <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs">{post.shares}</span>
          </button>
        </div>
        <button className="text-gray-500 hover:text-neon-purple transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function SocialFeedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="feed" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background image accent */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/emoji-reactions.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.04] blur-sm saturate-50"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 mb-6">
            <MessageCircle className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-neon-purple font-medium">Social Proof</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Brands Are <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real results. Real businesses. Real growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feedPosts.map((post, i) => (
            <FeedCard key={post.username} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
