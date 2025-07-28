import { useState, useEffect } from 'react';


export default function Navbar() {
    const [isLightNavbarTheme, setIsLightNavbarTheme] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const darkSectionEnd = 500;
            const lightSectionEnd = 1500; 

            if (
                scrollPosition < darkSectionEnd || // Example: Hero section is dark
                (scrollPosition >= lightSectionEnd && scrollPosition < 1500) // Example: Another dark section
            ) {
                setIsLightNavbarTheme(true); // Navbar text should be light (e.g., white)
            } else {
                setIsLightNavbarTheme(false); // Navbar text should be dark (e.g., black)
            }

            // Also set a state for general scrolling (e.g., to add a solid background to the sticky navbar)
            setIsScrolled(scrollPosition > 0);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Call handler once on mount to set initial state
        handleScroll();

        // Cleanup: Remove event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Define classes based on state
    const textColorClass = isLightNavbarTheme ? 'text-white' : 'text-gray-900'; // text-gray-900 for dark text
    const linkHoverClass = isLightNavbarTheme ? 'hover:text-gray-300' : 'hover:text-blue-600'; // Example hover
	const textSize = isScrolled ? 'text-xl' : 'text-sm';
    const navBgClass = isScrolled
        ? 'bg-opacity-80 backdrop-blur-md shadow-md' // Solid background on scroll
        : 'bg-transparent'; // Transparent when not scrolled

    return (
        <nav
            // Apply sticky positioning, z-index, and dynamic classes for background and text color
            className={`flex justify-between items-center px-5 sticky top-0 z-30 -mt-20 transition-all duration-300 ${navBgClass}`}
        >
            <div className="flex gap-2 items-center py-2">
                <img src="/logo/logo.png" alt="logo" width={isScrolled ? 64 : 48} height={isScrolled ? 64 : 48} className='duration-300' />
                <div>
                    <p className={`${textSize} font-bold ${textColorClass} duration-300`}>Kementerian Agama</p>
                    <p className={`${textSize} font-bold ${textColorClass} duration-300`}>Kota Probolinggo</p>
                </div>
            </div>
            <div className="flex items-center">
                <a href="/" className={`px-4 py-2 rounded-md duration-300 ${linkHoverClass}`}>Home</a>
                <a href="/about" className={`px-4 py-2 rounded-md duration-300 ${linkHoverClass}`}>About</a>
                <a href="/contact" className={`px-4 py-2 rounded-md duration-300 ${linkHoverClass}`}>Contact</a>
            </div>
        </nav>
    );
}

