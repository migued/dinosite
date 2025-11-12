'use client';

import { FAQBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQProps {
  block: FAQBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<FAQBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function FAQ({ block, isEditing, onUpdate, theme }: FAQProps) {
  const { title, subtitle, items } = block.data;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
          >
            {title}
          </h2>
          <p
            className="text-xl text-gray-600"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
          >
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <h3
                  className="text-lg font-semibold text-gray-900"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onClick={(e) => isEditing && e.stopPropagation()}
                  onBlur={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...item, question: e.currentTarget.textContent || '' };
                    onUpdate?.({ items: newItems });
                  }}
                >
                  {item.question}
                </h3>
                {openIndex === index ? (
                  <FaChevronUp className="flex-shrink-0" style={{ color: theme?.primaryColor || '#3B82F6' }} />
                ) : (
                  <FaChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p
                    className="text-gray-700 leading-relaxed"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newItems = [...items];
                      newItems[index] = { ...item, answer: e.currentTarget.textContent || '' };
                      onUpdate?.({ items: newItems });
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
