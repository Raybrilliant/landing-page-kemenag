import { DownloadIcon, EyeIcon, FileText } from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { useState, useEffect } from "react";
import pb from "@/lib/database";
import { Skeleton } from "./ui/skeleton";

interface Laporan {
    id: number;
    name: string;
    content: string;
    document: string;
}

export const LaporanDetail = () => {
    const [laporan, setLaporan] = useState<Laporan[]>([]);
    const [loading, setLoading] = useState(true);
    const getLaporan = async () => {
        const res = await fetch("/api/laporan");
        const data = await res.json();
        console.log(data);
        
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setLaporan(data);
        setLoading(false);
    };

    useEffect(() => {
        getLaporan();
    }, []);

    return (
        <section className="flex flex-col gap-5 mt-10">
        {loading ? (
            <div className="flex justify-center items-center">
                <Skeleton className="w-24 h-24" />
                <Skeleton className="w-24 h-24" />
                <Skeleton className="w-24 h-24" />
            </div>
            ) : (
                laporan.map((item, index) => (
                    <BlurFade key={item.id} inView delay={0.2 * index} direction="left">
                        <div className="bg-white p-5 rounded-md">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-red-200 min-w-13 min-h-13 rounded-md flex justify-center items-center">
                                    <FileText className="text-red-500"/>
                                </div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                            </div>
                            <p className="text-sm">{item.content}</p>
                            <div className="flex text-sm justify-between mt-5" hidden={!item.document}>
                                <a href={pb.files.getURL(item, item.document)} target="_blank" rel="noopener noreferrer" className="text-blue-500 group hover:underline flex items-center">
                                    <EyeIcon className="w-4 h-4 mr-2 group-hover:scale-120 transition duration-300" /> Lihat Dokumen
                                </a>
                                <a href={pb.files.getURL(item, item.document, {download: true})} target="_blank" rel="noopener noreferrer" className="text-blue-500 group hover:underline flex items-center">
                                    <DownloadIcon className="w-4 h-4 mr-2 group-hover:scale-120 transition duration-300" /> Unduh Dokumen
                                </a>
                            </div>
                        </div>
                    </BlurFade>
                ))
            )} 
        </section>
    );
}