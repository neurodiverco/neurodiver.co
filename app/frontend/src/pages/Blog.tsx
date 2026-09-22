// src/pages/Blog.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search, Clock, ArrowUpRight } from "lucide-react";
import { categories, posts } from "../data/blogPosts";
import { useSEO } from "@/hooks/useSEO";
import PageHeader from "@/components/marketing/PageHeader";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import { FinalCtaBand } from "@/components/marketing/Section";
import FAQSection from "@/components/FAQsection";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  featured?: boolean;
}


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function useBlogSEO(activeCategory: string) {
  const title =
    activeCategory === "All"
      ? "Blog — Insights on ADHD, Neurodiversity & Sustainable Productivity"
      : `${activeCategory} Articles — NeuroDiver Blog`;
  const description =
    "Practical, evidence-informed articles on ADHD, executive dysfunction, neurodiversity at work, burnout, and tools that actually help neurodivergent adults work sustainably.";

  useSEO({
    title,
    description,
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "NeuroDiver Blog",
      description,
      url: "https://www.neurodiver.co/blog",
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `https://www.neurodiver.co${post.image}`,
        datePublished: post.date,
        url: `https://www.neurodiver.co/blog/${post.slug}`,
        author: { "@type": "Organization", name: "NeuroDiver" },
      })),
    },
  });
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 6) * 0.06 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block h-full overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_16px_36px_rgba(45,90,61,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(45,90,61,0.14)]"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-primary/5">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        <div className="p-5 md:p-6">
          <h2 className="font-serif text-xl leading-snug text-primary md:text-2xl">
            {post.title}
          </h2>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-primary/65 md:text-base">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4 text-xs text-primary/50 md:text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary transition-colors group-hover:text-orange">
              Read
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 md:mb-16"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-4xl border border-primary/10 bg-white shadow-[0_25px_60px_rgba(45,90,61,0.12)] transition-all duration-300 hover:shadow-[0_30px_70px_rgba(45,90,61,0.18)] md:grid-cols-2"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-primary/5 md:aspect-auto">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-transparent to-transparent md:bg-linear-to-r" />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="inline-flex w-fit items-center rounded-full bg-yellow/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Featured · {post.category}
          </span>
          <h2 className="mt-4 font-serif text-2xl leading-tight text-primary md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-3 leading-relaxed text-primary/70 md:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-primary/50">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <span className="mt-6 inline-flex w-fit items-center gap-1.5 font-semibold text-primary transition-colors group-hover:text-orange">
            Read the article
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useBlogSEO(activeCategory);

  const featured = posts.find((post) => post.featured);
  const restPosts = posts.filter((post) => !post.featured);

  const filteredPosts = useMemo(() => {
    return restPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [restPosts, activeCategory, query]);

  const showFeatured = activeCategory === "All" && query.trim() === "" && featured;

  return (
    <main className="bg-soft">
      <PageHeader
        eyebrow="The NeuroDiver blog"
        title="Insights for minds that work differently."
        description="Practical articles on ADHD, executive dysfunction, neurodiversity at work, and sustainable ways of working."
        compact
      />
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">

        {/* Search */}
        <div className="mx-auto mb-6 max-w-md">
          <div className="flex items-center gap-2.5 rounded-full border border-primary/15 bg-white px-4 py-3 focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20">
            <Search className="h-4 w-4 flex-none text-primary/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full bg-transparent text-sm text-primary placeholder:text-primary/40 outline-none"
            />
          </div>
        </div>

        {/* Category filters */}
        <nav
          aria-label="Filter articles by category"
          className="mb-12 flex flex-wrap items-center justify-center gap-2 md:mb-16"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_10px_25px_rgba(45,90,61,0.25)]"
                    : "bg-white text-primary/60 hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {/* Featured post */}
        {showFeatured && <FeaturedPost post={featured} />}

        {/* Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-dashed border-primary/20 bg-white/50 py-16 text-center"
          >
            <p className="font-serif text-xl text-primary">No articles match your search.</p>
            <p className="mt-2 text-primary/60">Try a different keyword or category.</p>
          </motion.div>
        )}
      </div>

      <FAQSection />

      <FinalCtaBand
        title="Support beyond the article."
        body="When reading turns into doing, body doubling and the rest of the toolkit are in the NeuroDiver app."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
      </FinalCtaBand>
    </main>
  );
}