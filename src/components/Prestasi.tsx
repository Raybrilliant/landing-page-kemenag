import { BlurFade } from "./magicui/blur-fade"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState, useEffect } from "react"
import { ItemPagination } from "./ItemPagination"
import { Skeleton } from "./ui/skeleton"
import pb from "@/lib/database"

interface PrestasiItem {
    id: string;
    name: string;
    description: string;
    document: string[];
    date: string;
}
interface PrestasiResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: PrestasiItem[];
}

export const Prestasi = () => {
    const [open, setOpen] = useState(false);
    const [prestasi, setPrestasi] = useState<PrestasiResponse | null>(null);
    const [selected, setSelected] = useState<PrestasiItem | null>(null);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [name, setName] = useState("");

    const url = '/api/prestasi?limit=15&page=' + page;
    const getPrestasi = async () => {
        const res = await fetch(url + (name ? `&name=${name}` : ""));
        const data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        setPrestasi(data);
        setLoading(false);
    };
    

    const handleOpen = (item: PrestasiItem) => {
        setSelected(item);
        setOpen(true);
    };
    
    useEffect(() => {
        getPrestasi();
    }, [page]);

    return (
        <>
        <div className="flex items-center justify-end max-sm:justify-center my-5 gap-2">
                <input type="text" placeholder="Cari Prestasi" name="name" className="border border-gray-300 rounded-md px-3 py-2" onChange={(e) => setName(e.target.value)}/>
                <button type="button" onClick={getPrestasi} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600/80 hover:px-7 duration-300 cursor-pointer">Cari</button>
        </div>
            <section className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-10">
                {loading ? (
                    <>
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    <Skeleton className="w-full h-64 shadow-xl bg-white" />
                    </>
                ) : (
                    prestasi?.items.map((item, index) => (
                        <BlurFade key={index} delay={0.2} direction="right" inView>
                            <div className="p-5 bg-white md:min-h-[30rem] rounded-lg hover:shadow-xl hover:bg-white transition duration-300 cursor-pointer" onClick={() => handleOpen(item)}>
                                <img src={pb.files.getURL(item,item?.document[0] ?? '')} alt="photo-prestasi" className="w-full h-60 object-top object-cover"/>
                                <h2 className="text-xl font-semibold my-3">{item.name}</h2>
                                <p className="text-sm text-gray-500 my-2">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p className="text-justify">{item.description}</p>
                            </div>
                </BlurFade>
            )))}
            </section>
            <ItemPagination 
                page={page}
                totalPage={prestasi?.totalPages ?? 0}
                getPageUrl={(page) => url + page}
                onPageChange={(newPage) => setPage(newPage)}
            />  


        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-xl p-10 max-sm:min-w-0">
                <DialogHeader>
                    <DialogTitle>{selected?.name}</DialogTitle>
                    <section className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 my-5 max-h-[calc(100vh-20rem)] overflow-auto">
                        {selected?.document.map((item, index) => ( 
                            <img src={pb.files.getURL(selected!,item ?? '')} alt="photo-prestasi" className="w-full object-cover"/>
                        ))}
                    </section>
                    <DialogDescription>{selected?.description}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
        

    )
}