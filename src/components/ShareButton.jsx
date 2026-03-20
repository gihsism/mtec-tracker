import { useState } from 'react';
import { encodeForSharing } from '../utils/parseTranscript';

export default function ShareButton({ courses }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const encoded = encodeForSharing(courses);
    const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
    >
      {copied ? 'Link Copied!' : 'Share Progress'}
    </button>
  );
}
