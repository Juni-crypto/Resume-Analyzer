import React from 'react';
import { blogContents } from '../../data/blogContent';

interface BlogContentProps {
  slug: string;
}

export function BlogContent({ slug }: BlogContentProps) {
  const content = blogContents[slug];

  if (!content?.sections) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.sections.map((section, index) => (
        <section key={index} className="mb-8">
          {section.title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          )}
          {section.content?.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-gray-700 mb-4">{paragraph}</p>
          ))}
          {section.list && (
            <ul className="list-disc pl-6 mb-4">
              {section.list.map((item, lIndex) => (
                <li key={lIndex} className="text-gray-700 mb-2">{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}