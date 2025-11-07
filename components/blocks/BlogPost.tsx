import { BlogPostBlock } from '@/types/blocks';
import { useMemo } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';

interface BlogPostProps {
  block: BlogPostBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<BlogPostBlock['data']>) => void;
}

export default function BlogPost({ block, isEditing, onUpdate }: BlogPostProps) {
  const site = useEditorStore((state) => state.site);

  // Find the blog post
  const post = useMemo(() => {
    if (!site?.blog?.posts || !block.data.postId) return null;
    return site.blog.posts.find(p => p.id === block.data.postId);
  }, [site?.blog?.posts, block.data.postId]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-lg">
            {isEditing
              ? 'Select a blog post to display from the editor settings'
              : 'Blog post not found'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <article className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500">
              {formatDate(post.publishedAt || post.created_at)}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="text-gray-800 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-8 border-t border-gray-200">
            <span className="text-gray-700 font-semibold">Tags:</span>
            {post.tags.map((tag, idx) => (
              <a
                key={idx}
                href={`#tag/${tag}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="#blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </article>
  );
}
