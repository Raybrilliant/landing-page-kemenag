import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";

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

    return () => window.removeEventListener("scroll", handleScroll);
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
    { href: "/#contact", label: "Hubungi Kami" },
  ];

  const profileLinks = [
    { href: "/profil/visi-misi", label: "Visi & Misi" },
    { href: "/profil/sejarah", label: "Sejarah" },
    // { href: "/profil/tugas-fungsi", label: "Tugas & Fungsi" },
    { href: "/profil/struktur", label: "Struktur" },
  ];

  const satkerLinks = [
    { href: "https://www.mtsnkotaprobolinggo.sch.id", label: "Mts Negeri Kota Probolinggo" },
    { href: "https://www.man1kotaprobolinggo-m1kp.sch.id/", label: "MA Negeri 1 Kota Probolinggo" },
    { href: "https://man2kotaprobolinggo.sch.id/", label: "MA Negeri 2 Kota Probolinggo" },
  ]

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
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex items-center gap-2">
              {/* Profil dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-normal">
                  Profil
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-max bg-white shadow-lg rounded p-2">
                  {profileLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800"
                    >
                      {link.label}
                    </a>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Satker dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-normal">
                  Satker
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-max bg-white shadow-lg rounded p-2">
                  {satkerLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800"
                    >
                      {link.label}
                    </a>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Link biasa */}
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <a
                      href={link.href}
                      className={`px-4 py-2 rounded-md duration-300 ${linkHoverClass}`}
                    >
                      {link.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
          <a href="/berita" className="py-2 px-2 text-gray-900 hover:bg-gray-100 rounded-md">
            Berita
          </a>
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
          {/* Mobile Profil Dropdown */}
          <div className="mt-2 border-t pt-2">
            <p className="font-semibold mb-2">Profil</p>
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-1 text-gray-900 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}