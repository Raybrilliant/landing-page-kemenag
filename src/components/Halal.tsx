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
        document: "/halal/ALUR_SERTIFIKASI_HALAL_REGULER.webp",
    },
    {
        name: "ALUR SERTIFIKASI HALAL SELF DECLARE",
        document: "/halal/ALUR_SERTIFIKASI_HALAL_SELF_DECLARE.webp",
    },
    {
        name: "BARANG JASA WAJIB SERTIFIKAT HALAL",
        document: "/halal/BARANG_JASA_WAJIB_SERTIFIKAT_HALAL.webp",
    },
    {
        name: "CEK LABEL HALAL",
        document: "/halal/CEK_LABEL_HALAL.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI HALAL REGULER",
        document: "/halal/DOKUMEN_SERTIFIKASI_HALAL_REGULER.webp",
    },
    {
        name: "DOKUMEN SERTIFIKASI SELF DECLARE",
        document: "/halal/DOKUMEN_SERTIFIKASI_SELF_DECLARE.webp",
    },
    {
        name: "HALAL DAN HARAM",
        document: "/halal/HALAL_DAN_HARAM.webp",
    },
    {
        name: "Himbauan Akun Sihalal",
        document: "/halal/Himbauan_Akun_Sihalal.webp",
    },
    {
        name: "KETENTUAN PENCANTUMAN LABEL HALAL",
        document: "/halal/KETENTUAN _PENCANTUMAN_LABEL_HALAL.webp",
    },
    {
        name: "Kriteria-Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 1",
        document: "/halal/Kriteria_Syarat_PU_Mikro_dan_Kecil_Sertifikasi_Halal_Self_Declare_JILID_1.webp",
    },
    {
        name: "Kriteria-Syarat PU Mikro dan Kecil Sertifikasi Halal Self Declare JILID 2",
        document: "/halal/Kriteria_Syarat_PU_Mikro_dan_Kecil_Sertifikasi_Halal_Self_Declare_JILID_2.webp",
    },
    {
        name: "LABEL HALAL",
        document: "/halal/LABEL_HALAL.webp",
    },
    {
        name: "PU WAJIB P3H",
        document: "/halal/PU_WAJIB_P3H.webp",
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