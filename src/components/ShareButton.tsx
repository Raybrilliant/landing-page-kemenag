import { Facebook, Instagram, Send } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title?: string;
  className?: string;
}

const ShareButtons = ({ url, title, className }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const shareWhatsapp = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const shareInstagram = `https://www.instagram.com/?url=${encodedUrl}`;
  // ⚠️ Instagram gak punya share API resmi, jadi cuma redirect

  return (
    <div className={`flex gap-3 ${className}`}>
      {/* WhatsApp */}
      <a
        href={shareWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-green-500 text-white rounded-full hover:scale-110 transition-transform"
      >
        <Send size={20} />
      </a>

      {/* Facebook */}
      <a
        href={shareFacebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
      >
        <Facebook size={20} />
      </a>

      {/* Instagram */}
      <a
        href={shareInstagram}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-pink-500 text-white rounded-full hover:scale-110 transition-transform"
      >
        <Instagram size={20} />
      </a>
    </div>
  );
};

export default ShareButtons;