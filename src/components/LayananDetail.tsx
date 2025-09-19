import { MoveRight } from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import IconWrapper from "./IconWrapper";
import { MagicCard } from "./magicui/magic-card";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

const randomBackground = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'];
const randomIcon = ["MoonStar", "School", "ShieldCheck", "Users", "FileText", "ChartPie","Laptop"];


interface Layanan {
    id: string;
    name: string;
    description: string;
    external_link: string;
}

export const LayananDetail = ({id, className}: any) => {
    const [layanan, setLayanan] = useState<Layanan[]>([]);
    const [loading, setLoading] = useState(true);
    
    const getLayanan = async () => {
        const res = await fetch("/api/layanans?categoryId=" + id);
        const data = await res.json();
        if (!res.ok) {
            console.log("Failed to fetch data");
        }
        setLayanan(data as Layanan[]);
        setLoading(false);
    };
    
    useEffect(() => {
        getLayanan();
    }, []);
    
    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-4 row-auto max-sm:grid-cols-2 gap-5 max-sm:gap-2">
                {loading ? (
                    <>
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    </>
                ) : layanan.map((item, index) => (
                    <BlurFade delay={0.12 * index} direction="left" inView key={item.id}>
                            <div className="rounded-md border hover:shadow-xl hover:bg-white transition duration-300 cursor-pointer">
                                <MagicCard gradientColor={"#D9D9D955"} gradientSize={200} className="p-0">
                                    <a href={item.external_link || `/layanan/sub-layanan/${item.id}`} target={item.external_link ? '_blank' : '_self'}>
                                    <div className="text-center space-y-3 p-5">
                                        <div className={`${randomBackground[Math.floor(Math.random() * randomBackground.length)]} w-16 max-sm:w-12 h-16 max-sm:h-12 rounded mx-auto flex justify-center items-center`}>
                                            <IconWrapper IconComponentName={randomIcon[Math.floor(Math.random() * randomIcon.length)]} className="w-8 max-sm:w-6 h-8 max-sm:h-6 text-gray-800" />
                                        </div>
                                        <h1 className="text-lg max-sm:text-sm font-bold max-sm:font-medium">{item.name}</h1>
                                        <p className="text-sm max-sm:hidden">{item.description}</p>
                                        <div className="text-green-600 group hover:underline cursor-pointer text-sm flex items-center justify-center">
                                            <span>Selengkapnya</span>
                                            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                    </a>
                                </MagicCard>
                            </div>
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}