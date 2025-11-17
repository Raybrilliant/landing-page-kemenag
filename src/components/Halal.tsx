import { BlurFade } from "./magicui/blur-fade"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState } from "react"
import { ItemPagination } from "./ItemPagination"

interface HalalItem {
    name: string;
    document: string;
}

const data =[
    {
        name: "ALUR SERTIFIKASI HALAL REGULER",
        document: "/halal/ALUR SERTIFIKASI HALAL REGULER.webp",
    },
    {
        name: "ALUR SERTIFIKASI HALAL SELF DECLARE",
        document: "/halal/ALUR SERTIFIKASI HALAL SELF DECLARE.webp",
    },
    {
        name: "BARANG JASA WAJIB SERTIFIKAT HALAL",
        document: "/halal/BARANG JASA WAJIB SERTIFIKAT HALAL.webp",
    },
    {
        name: "CEK LABEL HALAL",
        document: "/halal/CEK LABEL HALAL.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI HALAL REGULER",
        document: "/halal/DOKUMEN SERTIFIKASI HALAL REGULER.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI SELF DECLARE",
        document: "/halal/DOKUMEN SERTIFIKASI SELF DECLARE.webp",
    },
    {
        name: "HALAL DAN HARAM",
        document: "/halal/HALAL DAN HARAM.webp",
    },
    {
        name: "Himbauan Akun Sihalal",
        document: "/halal/Himbauan Akun Sihalal.webp",
    },
    {
        name: "KETENTUAN  PENCANTUMAN LABEL HALAL",
        document: "/halal/KETENTUAN  PENCANTUMAN LABEL HALAL.webp",
    },
    {
        name: "Kriteria_Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 1 ",
        document: "/halal/Kriteria_Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 1 .webp",
    },
    {
        name: "Kriteria-Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 2",
        document: "/halal/Kriteria-Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 2.webp",
    },
    {
        name: "LABEL HALAL",
        document: "/halal/LABEL HALAL.webp",
    },
    {
        name: "PU WAJIB P3H",
        document: "/halal/PU WAJIB P3H.webp",
    },
    {
        name: "SJPH",
        document: "/halal/SJPH.webp",
    },
]

export const Halal = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<HalalItem | null>(null);
    const [halal, setHalal] = useState<HalalItem[]>(data);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');

    const getHalal = () => {
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
        setHalal(filteredData);
    }

    const handleOpen = (item: HalalItem) => {
        setSelected(item);
        setOpen(true);
    };

    return (
        <>
        <div className="flex items-center justify-end max-sm:justify-center my-5 gap-2">
                <input type="text" placeholder="Cari Edukasi Halal" name="name" className="border border-gray-300 rounded-md px-3 py-2" onChange={(e) => setName(e.target.value)}/>
                <button type="button" onClick={() => getHalal()} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-600/80 hover:px-7 duration-300 cursor-pointer">Cari</button>
        </div>
            <section className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-10">
                {
                halal.map((item, index) => (
                    <BlurFade key={index} delay={0.2} direction="right" inView>
                        <div className="p-5 bg-white md:min-h-[30rem] rounded-lg hover:shadow-xl hover:bg-white transition duration-300 cursor-pointer" onClick={() => handleOpen(item)}>
                            <img src={item.document} alt="photo-prestasi" className="w-full h-60 object-top object-cover"/>
                            <h2 className="text-xl font-semibold my-3">{item.name}</h2>
                        </div>
                    </BlurFade>
                ))}
            </section>
            {/* <ItemPagination 
                page={page}
                totalPage={halal?.length ?? 0}
                getPageUrl={(page) => `/halal?page=${page}`}
                onPageChange={(newPage) => setPage(newPage)}
            />   */}


        {/* Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-xl p-10 max-sm:min-w-0">
                <DialogHeader>
                    <DialogTitle>{selected?.name}</DialogTitle>
                    <section className="my-5 max-h-[calc(100vh-20rem)] overflow-auto">
                        <img src={selected?.document ?? ''} alt="photo-prestasi" className="w-full object-cover"/>
                    </section>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
        

    )
}