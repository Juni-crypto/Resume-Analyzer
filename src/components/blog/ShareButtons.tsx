import React from 'react';
import { Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';

export function ShareButtons() {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "What Is an ATS and How Does It Work?";
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <div className="flex items-center gap-4 my-8 pt-8 border-t">
      <span className="text-gray-600">Share this article:</span>
      <div className="flex gap-2">
        {[
          { icon: Twitter, platform: 'twitter', color: 'hover:text-blue-400' },
          { icon: Linkedin, platform: 'linkedin', color: 'hover:text-blue-700' },
          { icon: Facebook, platform: 'facebook', color: 'hover:text-blue-600' },
          { icon: Link2, platform: 'copy', color: 'hover:text-green-600' }
        ].map(({ icon: Icon, platform, color }) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${color}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}