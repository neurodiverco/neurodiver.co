// src/pages/BlogPost.tsx
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "../data/blogPosts";
import { useSEO } from "@/hooks/useSEO";
import PageHeader from "@/components/marketing/PageHeader";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import { FinalCtaBand } from "@/components/marketing/Section";
import FAQSection from "@/components/FAQsection";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  const articleBody = post
    ? [
        post.intro,
        ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
        post.takeaway,
      ].join(" ")
    : "";

  useSEO({
    title: post ? post.title : "Article Not Found",
    description: post ? post.excerpt : "",
    path: post ? `/blog/${post.slug}` : "/blog",
    image: post ? `https://www.neurodiver.co${post.image}` : undefined,
    type: "article",
    article: post ? { publishedTime: post.date, tags: [post.category] } : undefined,
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: `https://www.neurodiver.co${post.image}`,
            datePublished: post.date,
            dateModified: post.date,
            url: `https://www.neurodiver.co/blog/${post.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.neurodiver.co/blog/${post.slug}`,
            },
            author: { "@type": "Organization", name: "NeuroDiver" },
            publisher: {
              "@type": "Organization",
              name: "NeuroDiver",
              logo: {
                "@type": "ImageObject",
                url: "https://www.neurodiver.co/images/logowords.png",
              },
            },
            articleSection: post.category,
            articleBody,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Blog", item: "https://www.neurodiver.co/blog" },
              { "@type": "ListItem", position: 2, name: post.title, item: `https://www.neurodiver.co/blog/${post.slug}` },
            ],
          },
        ]
      : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedPosts(post);

  return (
    <main className="bg-soft">
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        compact
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-paper/80 transition hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
        <span className="text-sm text-paper/65">
          {formatDate(post.date)} · {post.readTime}
        </span>
      </PageHeader>

      <div className="mx-auto max-w-3xl px-6 pb-4">
        <div className="overflow-hidden rounded-[20px] border border-line shadow-md">
          <img src={post.image} alt="" className="aspect-video w-full object-cover" />
        </div>
      </div>

      {/* Article body */}
      <article className="px-6 pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-lg leading-relaxed text-primary/80 md:text-xl"
          >
            {post.intro}
          </motion.p>

          <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
            {post.sections.map((section, index) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
              >
                <h2 className="font-serif text-2xl text-primary md:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="leading-relaxed text-primary/70 md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Takeaway callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 rounded-3xl border-2 border-dashed border-yellow bg-white p-6 md:mt-14 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-orange">
              Key takeaway
            </p>
            <p className="mt-2 font-serif text-lg leading-relaxed text-primary md:text-xl">
              {post.takeaway}
            </p>
          </motion.div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-primary/10 bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-2xl text-primary md:text-3xl">
              More on {post.category}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-primary/10 bg-cream shadow-[0_14px_32px_rgba(45,90,61,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg leading-snug text-primary">
                      {relatedPost.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-orange">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection />

      <FinalCtaBand
        title="Try support that fits your brain."
        body="Book a body doubling session or explore check-ins and strategies in the NeuroDiver app."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
      </FinalCtaBand>
    </main>
  );
}