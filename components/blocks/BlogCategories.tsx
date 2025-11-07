import { BlogCategoriesBlock } from '@/types/blocks';
import { useMemo } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';

interface BlogCategoriesProps {
  block: BlogCategoriesBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<BlogCategoriesBlock['data']>) => void;
}

export default function BlogCategories({ block, isEditing, onUpdate }: BlogCategoriesProps) {
  const { title, displayStyle } = block.data;
  const site = useEditorStore((state) => state.site);

  // Get categories with post counts
  const categoriesWithCounts = useMemo(() => {
    if (!site?.blog?.posts) return [];

    const counts: Record<string, number> = {};
    site.blog.posts
      .filter(post => post.published)
      .forEach(post => {
        counts[post.category] = (counts[post.category] || 0) + 1;
      });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [site?.blog?.posts]);

  const renderGrid = () => (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoriesWithCounts.map((category) => (
        <a
          key={category.name}
          href={`#category/${category.name}`}
          className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600">
            {category.count} {category.count === 1 ? 'post' : 'posts'}
          </p>
        </a>
      ))}
    </div>
  );

  const renderPills = () => (
    <div className="flex flex-wrap justify-center gap-4">
      {categoriesWithCounts.map((category) => (
        <a
          key={category.name}
          href={`#category/${category.name}`}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
        >
          {category.name} ({category.count})
        </a>
      ))}
    </div>
  );

  const renderSidebar = () => (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
        Browse by Category
      </h3>
      <ul className="space-y-3">
        {categoriesWithCounts.map((category) => (
          <li key={category.name}>
            <a
              href={`#category/${category.name}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <span className="font-medium text-gray-800 group-hover:text-blue-600">
                {category.name}
              </span>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                {category.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
          >
            {title}
          </h2>
        </div>

        {categoriesWithCounts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories yet. Start creating blog posts!</p>
          </div>
        ) : (
          <>
            {displayStyle === 'grid' && renderGrid()}
            {displayStyle === 'pills' && renderPills()}
            {displayStyle === 'sidebar' && renderSidebar()}
          </>
        )}
      </div>
    </section>
  );
}
