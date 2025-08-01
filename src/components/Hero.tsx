import { useState, useEffect } from "react";
 

export default function Hero() {
    const [isScrolled, setIsScrolled] = useState(false);

        useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const videoSize = isScrolled ? "rounded-none md:scale-110" : "rounded-2xl";

    return (
        <>
			<div className={`${videoSize} px-10 max-sm:px-5 py-32 md:-ml-30 relative overflow-hidden duration-500 mx-auto`}>
				<video src="/bg.webm" autoPlay muted loop className="w-full h-full object-cover absolute top-0 left-0 z-0"></video>
	
				<div className="space-y-2 text-white md:w-1/3 relative z-10">
					<h3 className="text-xl max-sm:text-sm font-semibold">Selamat Datang di</h3>
					<h1 className="text-3xl max-sm:text-xl font-bold">Portal Resmi Kementerian Agama Kota Probolinggo</h1>
					<p className="text-sm max-sm:text-xs">Berkhidmah untuk Umat Dalam Keberagaman Bersatupadu Bergerak dan Berkarya Wujudkan Negeri yang Damai</p>
				</div>
                <input type="search" className="border bg-white border-gray-300 rounded-full px-4 py-2 w-1/3 max-sm:w-full mt-5 h-10 focus:h-12 duration-600 relative z-10" placeholder="Ada yang bisa kami bantu..."></input>
			</div>
        </>
    )
}