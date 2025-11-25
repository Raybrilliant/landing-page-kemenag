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
        name: "HIMBAUAN PENTING UNTUK PELAKU USAHA HALAL",
        document: "/halal/14-HIMBAUAN-PENTING-UNTUK-PELAKU-USAHA-HALAL.webp",
    },
    {
        name: "PENJELASAN LABEL HALAL",
        document: "/halal/1-PENJELASAN-LABEL-HALAL.webp",
    },
    {
        name: "CARA CEK LABEL HALAL PRODUK",
        document: "/halal/2-CARA-CEK-LABEL-HALAL-PRODUK.webp",
    },
    {
        name: "PENJELASAN HALAL HARAM",
        document: "/halal/3-PENJELASAN-HALAL-HARAM.webp",
    },
    {
        name: "PENJELASAN SISTEM JAMINAN PRODUK HALAL",
        document: "/halal/4-PENJELASAN-SISTEM-JAMINAN-PRODUK-HALAL.webp",
    },
    {
        name: "KRITERIA:SYARAT PELAKU USAHA (PU) MIKRO DAN KECIL UNTUK SERTIFIKASI HALAL SELF DECLARE JILID 1",
        document: "/halal/5-KRITERIA:SYARAT-PELAKU-USAHA-(PU)-MIKRO-DAN-KECIL-UNTUK-SERTIFIKASI-HALAL-SELF-DECLARE-JILID-1.webp",
    },
    {
        name: "KRITERIA:SYARAT PELAKU USAHA (PU) MIKRO DAN KECIL UNTUK SERTIFIKASI HALAL SELF DECLARE JILID 2",
        document: "/halal/6-KRITERIA:SYARAT-PELAKU-USAHA-(PU)-MIKRO-DAN-KECIL-UNTUK-SERTIFIKASI-HALAL-SELF-DECLARE-JILID-2.webp",
    },
    {
        name: "PRODUK BARANG WAJIB BERSERTIFIKAT HALAL",
        document: "/halal/7-PRODUK-BARANG-WAJIB-BERSERTIFIKAT-HALAL.webp",
    },
    {
        name: "PRODUK JASA LAYANAN WAJIB BERSERTIFIKAT HALAL",
        document: "/halal/8-PRODUK-JASA-LAYANAN-WAJIB-BERSERTIFIKAT-HALAL.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI HALAL SELFDECLARE",
        document: "/halal/9-DOKUMEN-SERTIFIKASI-HALAL-SELFDECLARE.webp",
    },
    {
        name: "ALUR SERTIFIKASI HALAL SELFDECLARE",
        document: "/halal/10-ALUR-SERTIFIKASI-HALAL-SELFDECLARE.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI HALAL REGULER",
        document: "/halal/11-DOKUMEN-SERTIFIKASI-HALAL-REGULER.webp",
    },
    {
        name: "ALUR SERTIFIKASI HALAL REGULER",
        document: "/halal/12-ALUR-SERTIFIKASI-HALAL-REGULER.webp",
    },
    {
        name: "PELAKU USAHA WAJIB MELAKUKAN PROSES PRODUKSI HALAL",
        document: "/halal/13-PELAKU-USAHA-WAJIB-MELAKUKAN-PROSES-PRODUKSI-HALAL.webp",
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
                halal.slice((page - 1) * 6, page * 6).map((item, index) => (
                    <BlurFade key={index} delay={0.2} direction="right" inView>
                        <div className="p-5 bg-white md:min-h-[30rem] rounded-lg hover:shadow-xl hover:bg-white transition duration-300 cursor-pointer" onClick={() => handleOpen(item)}>
                            <img src={item.document} alt="photo-prestasi" className="w-full h-60 object-top object-cover"/>
                            <h2 className="text-xl font-semibold my-3">{item.name}</h2>
                        </div>
                    </BlurFade>
                ))}
            </section>
            <ItemPagination 
                page={page}
                totalPage={Math.ceil(halal?.length/6)}
                getPageUrl={(page) => `#`}
                onPageChange={(newPage) => setPage(newPage)}
            />  


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