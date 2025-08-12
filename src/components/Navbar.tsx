import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isLightNavbarTheme, setIsLightNavbarTheme] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const darkSectionEnd = 500;
      const lightSectionEnd = 1500;

      if (isHome) {
        if (
          scrollPosition < darkSectionEnd ||
          (scrollPosition >= lightSectionEnd && scrollPosition < 1500)
        ) {
          setIsLightNavbarTheme(true);
        } else {
          setIsLightNavbarTheme(false);
        }
      }

      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const baseTextTransition = "transition-colors duration-300";

  const textColorClass = !isHome
    ? `text-gray-900 ${baseTextTransition}`
    : isLightNavbarTheme
    ? `text-white ${baseTextTransition}`
    : `text-gray-900 ${baseTextTransition}`;

  const linkHoverClass = !isHome
    ? "hover:text-green-600"
    : isLightNavbarTheme
    ? "hover:text-gray-300"
    : "hover:text-green-600";

  const textSize = isScrolled ? "text-xl" : "text-sm";
  const navBgClass = isScrolled
    ? "bg-opacity-80 backdrop-blur-md shadow-md"
    : "bg-transparent";

  const navLinks = [
    { href: "/progres", label: "Cek Progres" },
    { href: "/#layanan", label: "Layanan" },
    { href: "/struktur", label: "Struktur" },
    { href: "/#contact", label: "Hubungi Kami" },
  ];

  return (
    <nav
      className={`flex flex-wrap justify-between items-center px-5 sticky top-0 z-30 -mt-20 transition-all duration-300 ${navBgClass}`}
    >
      {/* Logo */}
      <div className="flex gap-2 items-center py-2">
        <img
          src="/logo/logo.png"
          alt="logo"
          width={isScrolled ? 64 : 48}
          height={isScrolled ? 64 : 48}
          className="duration-300"
        />
        <a href="/">
          <p className={`${textSize} font-bold ${textColorClass}`}>
            Kementerian Agama
          </p>
          <p className={`${textSize} font-bold ${textColorClass}`}>
            Kota Probolinggo
          </p>
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-md duration-300 ${linkHoverClass}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-md ${textColorClass}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full md:hidden flex flex-col bg-white shadow-md rounded-md mt-2 p-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 px-2 text-gray-900 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
