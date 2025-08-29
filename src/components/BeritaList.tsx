
import { BlurFade } from "./magicui/blur-fade";
import { useState, useEffect } from "react";
import pb from "@/lib/database";
import { Skeleton } from "./ui/skeleton";
import { Berita } from "./Berita";

interface Berita {
    id: string;
    title: string;
    slug: string;
    created: string;
    document: string;
}

export const BeritaList = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);

    const getBerita = async () => {
        const res = await fetch("/api/beritas?limit=4");
        const data = await res.json();
        // console.log(data);
        
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setBerita(data as Berita[]);
        setLoading(false);
    };
    
    useEffect(() => {
        getBerita();
    }, []);

    return (
        <BlurFade delay={0.5} direction="right" inView>
        <div className="relative w-full mx-10 max-sm:mx-5 mt-10 max-sm:hidden ">
            <div className="overflow-x-auto w-full">
               <div className="flex items-center gap-5">
                   {loading ? (
                       <div className="flex gap-5">
                           <Skeleton className="w-full h-32 bg-white" />
                           <Skeleton className="w-full h-32 bg-white" />
                           <Skeleton className="w-full h-32 bg-white" />
                       </div>
                   ) : (
                       berita.map((item) => (
                           <Berita key={item.id} title={item.title} slug={item.slug} date={item.created} image={pb.files.getURL(item, item.document)} />
                       ))
                   )}
               </div>
           </div>
           <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-accent"></div>
        </div>
     </BlurFade>
    );
}