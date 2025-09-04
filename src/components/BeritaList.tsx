
import { BlurFade } from "./magicui/blur-fade";
import { useState, useEffect } from "react";
import pb from "@/lib/database";
import { Skeleton } from "./ui/skeleton";
import { Berita } from "./Berita";

interface Berita {
    id: string;
    title: string;
    slug: string;
    date: string;
    document: string;
}

export const BeritaList = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    const getBerita = async () => {
        const res = await fetch("/api/beritas?limit=4");
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setBerita(data.items as Berita[]);
        setLoading(false);
    };
    
    useEffect(() => {
        getBerita();
    }, []);

    return (
        <BlurFade delay={0.5} direction="right" inView>
        <div className="relative w-full mx-10 max-sm:mx-5 mt-10 max-sm:hidden ">
        <div className="overflow-x-auto">
            <div className="flex gap-5 whitespace-nowrap">
                {loading ? (
                <div className="flex gap-5">
                    <Skeleton className="min-w-[250px] h-48 bg-white" />
                    <Skeleton className="min-w-[250px] h-48 bg-white" />
                    <Skeleton className="min-w-[250px] h-48 bg-white" />
                </div>
                ) : (
                berita.map((item) => (
                    <Berita 
                    key={item.id} 
                    title={item.title} 
                    slug={item.slug} 
                    date={item.date} 
                    image={pb.files.getURL(item, item.document)} 
                    className="min-w-[250px] flex-shrink-0" // biar kepaksa overflow
                    />
                ))
                )}
            </div>
            </div>
           <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-accent"></div>
        </div>
     </BlurFade>
    );
}