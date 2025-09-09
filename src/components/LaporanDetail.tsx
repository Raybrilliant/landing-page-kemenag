import { DownloadIcon, EyeIcon, FileText } from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { useState, useEffect } from "react";
import pb from "@/lib/database";
import { Skeleton } from "./ui/skeleton";
import { ItemPagination } from "./ItemPagination";

interface LaporanItem {
    id: string;
    name: string;
    content: string;
    document: string;
    expand: {
        category: {
            name: string;
        };
    };
}

interface LaporanResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: LaporanItem[];
}

export const LaporanDetail = () => {
    const [laporan, setLaporan] = useState<LaporanResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const url = '/api/laporan?limit=15&page=' + page;
    const getLaporan = async () => {
        const res = await fetch(url + (name ? `&name=${name}` : ""));
        const data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setLaporan(data);
        setLoading(false);
    };

    useEffect(() => {
        getLaporan();
    }, [page]);

    return (
    <>
        <div className="flex items-center justify-end max-sm:justify-center my-5 gap-2">
                <input type="text" placeholder="Cari Laporan" name="name" className="border border-gray-300 rounded-md px-3 py-2" onChange={(e) => setName(e.target.value)}/>
                <button type="button" onClick={getLaporan} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600/80 hover:px-7 duration-300 cursor-pointer">Cari</button>
        </div>
        <section className="flex flex-col gap-5">
        {loading ? (
                <div className="flex flex-col gap-4">
                    <Skeleton className="w-full h-32 bg-white" />
                    <Skeleton className="w-full h-32 bg-white" />
                    <Skeleton className="w-full h-32 bg-white" />
                </div>
            ) : laporan ? (
                laporan.items.map((item, index) => (
                    <BlurFade key={item.id} inView delay={0.2 * index} direction="left">
                        <div className="bg-white p-5 rounded-md">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="bg-red-200 min-w-13 min-h-13 rounded-md flex justify-center items-center">
                                    <FileText className="text-red-500"/>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-sm opacity-50">{item.expand.category.name}</p>
                                </div>
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
            ) : (
                <div>No data available</div>
            )}
            {laporan && laporan.totalPages > 1 && (
                <ItemPagination 
                    page={page}
                    totalPage={laporan.totalPages}
                    getPageUrl={(page) => url + page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            )}
        </section>
    </>

    );
}