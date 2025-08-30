import { EyeIcon, DownloadIcon, ArrowRightSquare, FileText } from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { useState, useEffect } from "react";
import pb from "@/lib/database";

interface Laporan {
    id: number;
    name: string;
    content: string;
    document: string;
}

export const Laporan = () => {
    const [laporan, setLaporan] = useState<Laporan[]>();
    const [loading, setLoading] = useState(true);
    const getLaporan = async () => {
        const res = await fetch("/api/laporan?limit=3");
        const data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setLaporan(data.items);
        setLoading(false);
    };

    useEffect(() => {
        getLaporan();
    }, []);

    return (
        <div className="bg-green-700 px-20 max-sm:px-5 py-20 max-sm:py-10">
            <div className="flex max-sm:flex-col justify-between gap-10 items-center text-white">
                <h2 className="text-2xl font-semibold">
                    Transparansi Informasi Kementerian Agama Kota Probolinggo
                </h2>
                <p>
                    Menyajikan publikasi dokumen resmi yang transpran, akurat, dan dapat dipertanggungjawabkan kepada masyarakat dan pemangku kepentingan lainnya.
                </p>
                <a href="/informasi" className="w-1/3 max-sm:w-full">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 group rounded-md w-full cursor-pointer">
                    Lihat Semua Informasi <ArrowRightSquare className="w-4 h-4 ml-1 inline-block group-hover:translate-x-1 transition duration-300" />
                </button>
                </a>
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-8 mt-10">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : (
                    laporan?.map((item, index) => (
                    <BlurFade inView delay={0.2 * index} direction="left" key={item.id}>
                    <div className="bg-white p-5 rounded-md">
                        <div className=" flex items-center gap-4 mb-5">
                            <div className="bg-red-200 min-w-13 min-h-13 rounded-md flex justify-center items-center">
                                <FileText className="text-red-500"/>
                            </div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                        </div>
                        <p className="text-sm">{item.content}</p>
                    <div className="flex text-sm justify-between mt-5" hidden={!item.document}>
                        <a href={pb.files.getURL(item,item.document)} target="_blank" className="text-blue-500 group hover:underline flex items-center"><EyeIcon className="w-4 h-4 mr-2 group-hover:scale-120 transition duration-300" /> Lihat Dokumen</a>
                        <a href={pb.files.getURL(item,item.document,{download: true})} target="_blank" className="text-blue-500 group hover:underline flex items-center"><DownloadIcon className="w-4 h-4 mr-2 group-hover:scale-120 transition duration-300" /> Unduh Dokumen</a>
                    </div>
                </div>
            </BlurFade>
            )))}
            </div>
        </div>
    );
}