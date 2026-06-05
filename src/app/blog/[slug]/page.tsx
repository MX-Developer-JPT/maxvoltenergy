import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getBySlug } from "@/lib/blog-store.server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBySlug(slug);
  if (!post) return { title: "Post Not Found | MaxVolt Energy" };
  return {
    title: `${post.title} | MaxVolt Energy Blog`,
    description: post.excerpt || post.title,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBySlug(slug);
  if (!post || !post.published) notFound();

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  return (
    <article className="bg-white">
      {/* Hero */}
      <div className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-custom relative z-10 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#71717a] hover:text-[#15171c] text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> All Articles
          </Link>
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#D97706]/30 text-[#D97706] bg-[#FFD100]/10 mb-5">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#15171c] leading-tight tracking-tight mb-5">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-[#71717a] text-sm">
            <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Tag size={13} /> {post.category}</span>
          </div>
        </div>
      </div>

      {/* Cover */}
      {post.coverImage && (
        <div className="container-custom max-w-4xl mb-10">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-black/6">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="container-custom max-w-3xl pb-24">
        {post.excerpt && (
          <p className="text-[#3f3f46] text-lg leading-relaxed font-medium border-l-4 border-[#FFD100] pl-5 mb-8">
            {post.excerpt}
          </p>
        )}
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-[#52525b] text-base leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-black/6 flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#D97706] font-bold text-sm hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <Link href="/contact-us" className="px-5 py-2.5 rounded-xl bg-[#FFD100] text-black font-bold text-sm hover:bg-[#FFA800] transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
    </article>
  );
}
