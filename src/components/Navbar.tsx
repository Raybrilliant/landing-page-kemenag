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

// IMPOR KOMPONEN DROPDOWN MENU
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"; // Sesuaikan path jika berbeda

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLightNavbarTheme, setIsLightNavbarTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State baru untuk melacak menu PPID mana yang sedang terbuka (untuk hover)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); 

  useEffect(() => {
    // Jalankan kode ini HANYA di client setelah hidrasi
    setIsHome(window.location.pathname === "/");

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const darkSectionEnd = 500;
      const lightSectionEnd = 1500;

      if (window.location.pathname === "/") {
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
    handleScroll(); // Panggil sekali untuk inisialisasi awal

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const textSize = isScrolled ? "text-md" : "text-sm";
  const navBgClass = isScrolled
    ? "bg-opacity-80 backdrop-blur-md shadow-md"
    : "bg-transparent";

  // Link yang akan ditampilkan di navbar
    const navLinks = [
    // { href: "/ppid", label: "PPID" },
    { href: "/regulasi", label: "Regulasi" },
    { href: "/#laporan", label: "Laporan" },
    { href: "/#layanan", label: "Layanan" },
    { href: "/progres", label: "Cek Progres" },
    { href: "/prestasi", label: "Prestasi Kita" },
    { href: "/survei", label: "Survei" },
    // { href: "/#contact", label: "Hubungi Kami" },
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

  const ppid = [
    { title: "Profil", href:"/ppid/profil", links: [
      // { href: "#", label: "Profil Pejabat" },
      // { href: "#", label: "Visi, Misi, dan Moto" },
      // { href: "#", label: "Tugas & Fungsi" },
      // { href: "#", label: "Struktur Organisasi" },
    ]},
    { title: "Daftar Informasi", links:[], href:"/daftar-informasi"},
    { title: "Informasi Publik", href:"/informasi-publik", links: [
      { href: "#", label: "Informasi Berkala" },
      { href: "#", label: "Informasi Serta Merta" },
      { href: "#", label: "Informasi Tersedia Setiap Saat" },
      { href: "#", label: "Informasi Dikecualikan" },
      { href: "#", label: "SOP Pelayanan" },
      { href: "#", label: "SP & SOP PTSP" },
      { href: "#", label: "Laporan Kinerja" },
      { href: "#", label: "Laporan Keuangan dan BMN" },
      { href: "#", label: "Laporan DIPA" },
      { href: "#", label: "Laporan Realisasi Anggaran" },
      { href: "#", label: "LHKPN" },
    ]},
    { title: "Regulasi", href:"/regulasi", links:[], },
    { title: "Layanan Informasi", href:"/layanan-informasi", links:[
      { href: "#", label: "Tata Cara Permohonan Informasi" },
      { href: "#", label: "Tata Cara Sengketa Informasi" },
      { href: "#", label: "Tata Cara Pengaduan Masyarakat" },
      { href: "#", label: "Tata Cara Pengajuan Keberatan" },
      { href: "#", label: "Alasan Pengajuan Keberatan" },
      { href: "#", label: "SOP Layanan Informasi Publik" },
      { href: "#", label: "Standar Pengumuman Informasi" },
    ]},
    { title: "Standar Layanan", href:"/standar-layanan", links:[
      { href: "#", label: "Maklumat Pelayanan" },
      { href: "#", label: "Jadwal Pelayanan" },
      { href: "#", label: "Biaya/Tarif Layanan" },
      { href: "#", label: "Standar Pelayanan" },
      { href: "#", label: "Arah Kebijakan Layanan" },
      { href: "#", label: "Strategi dan Metode PPEM" },
    ]},
    
  ]

  return (
    <nav
      className={`flex flex-wrap justify-between items-center px-5 sticky top-0 z-30 -mt-20 transition-all duration-300 ${navBgClass}`}
    >
      {/* Logo */}
      <div className="flex gap-2 items-center py-2">
        <img
          src="/logo/logo.webp"
          alt="logo"
          width={isScrolled ? 56 : 48}
          height={isScrolled ? 56 : 48}
          className="duration-300"
        />
        <a href="/">
          <p className={`${textSize} font-bold ${textColorClass}`}>
            Kantor Kementerian Agama
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

              {/* PPID dropdown - KODE PERBAIKAN DENGAN HOVER DI SINI */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-normal">
                  PPID
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-max bg-white shadow-lg rounded p-2">
                  <div className="flex flex-col gap-1 w-full">
                    {ppid.map((item) => (
                      <div key={item.title}>
                        {item.links.length > 0 ? (
                          // Menggunakan DropdownMenu untuk sub-menu bersarang
                          // Tambahkan open, onOpenChange, dan modal={false}
                          <div
                            onMouseEnter={() => setOpenDropdown(item.title)}
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            <DropdownMenu
                              open={openDropdown === item.title}
                              onOpenChange={(open) => {
                                // Jika ditutup karena klik item, biarkan state-nya null
                                // Jika ditutup karena mouseLeave, state sudah diatur di div luar
                                if (!open) setOpenDropdown(null);
                              }}
                              modal={false} // PENTING: Mencegah flicker dan memungkinkan hover
                            >
                              {/* Pemicu Sub-Menu */}
                              <DropdownMenuTrigger asChild>
                                <div className="flex justify-between items-center px-3 py-2 cursor-pointer rounded-md text-gray-800 hover:bg-gray-100 font-normal w-full text-left">
                                  {item.title}
                                  <span>&gt;</span>
                                </div>
                              </DropdownMenuTrigger>
                              
                              {/* Konten Sub-Menu. side="right" penting */}
                              <DropdownMenuContent side="right" align="start" className="shadow-xl">
                                {item.links.map((subLink) => (
                                  <DropdownMenuItem key={subLink.href} asChild>
                                    <a href={subLink.href}>
                                      {subLink.label}
                                    </a>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ) : (
                          // Tautan biasa jika tidak ada sub-link
                          <a
                            href={item.href} 
                            className="block px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md text-gray-800 bg-transparent font-normal text-left"
                          >
                            {item.title}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* END PPID dropdown */}

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
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
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
          {/* TODO: Implementasikan menu PPID Mobile di sini */}
        </div>
      )}
    </nav>
  );
}