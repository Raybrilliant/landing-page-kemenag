import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Syarat from "./Syarat";
import { Button } from "./ui/button";


interface Data {
    id: string;
}
interface Requirement {
    id: string;
    requirement: string;
    flow: string;
    fee: string;
    document_active: boolean;
}
export const LayananSubmit = ({layananID, className}: {layananID: string, className?: string}) => {
    const [loading, setLoading] = useState(false);
    const [requirement, setRequirement] = useState<Requirement>();
    const [data, setData] = useState<Data>();

    const getSubLayananRequirement = async () => {
        const res = await fetch("/api/sub-layanan?id=" + layananID);
        const data = await res.json();
        if (!res.ok) {
            console.log("Gagal mengambil data");
        }
        setRequirement(data);
        setLoading(false);
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            formData.append("service", layananID);
            const response = await fetch("/api/sub-layanan", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setData(data);
                console.log("Data berhasil dikirim");
            } else {
                console.log("Gagal mengirim data");
            }
            setLoading(false);
        } catch (error) {
            console.log("Gagal mengirim data");
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubLayananRequirement();
    }, []);

    return (
        <div className={className}>
        <Syarat requirement={requirement?.requirement} flow={requirement?.flow} fee={Number(requirement?.fee)}/>
        <form className="space-y-3" onSubmit={handleSubmit}>
            {data && <div className="p-4 bg-green-200 text-sm rounded-md mb-5">Permintaan Layanan Anda telah terkirim dengan nomor  <span className="font-bold">{data?.id}</span> mohon agar nomor dapat disimpan untuk melakukan pengecekan</div>}
            <div className="flex flex-col gap-1">
                <label htmlFor="nama" className="font-semibold">Nama Lengkap</label>
                <input type="text" id="nama" name="requester_name" placeholder="Fulan bin Fulan" className="w-full p-3 border border-gray-300 rounded-md bg-white"  required/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="institution" className="font-semibold">Nama Lembaga</label>
                <input type="text" id="institution" name="requester_institution" placeholder="Kemenag Kota Probolinggo" className="w-full p-3 border border-gray-300 rounded-md bg-white" required/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="font-semibold">Nomor WhatsApp</label>
                <input type="text" minLength={10} maxLength={13} id="phone" name="requester_phone" placeholder="08933453231" className="w-full p-3 border border-gray-300 rounded-md bg-white" required/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="mail_number" className="font-semibold">Nomor Surat</label>
                <input type="text" id="mail_number" name="mail_number" placeholder="B-200/Kp.03.78/08/2025" className="w-full p-3 border border-gray-300 rounded-md bg-white" required/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="mail_about" className="font-semibold">Perihal Surat</label>
                <input type="text" id="mail_about" name="mail_about" placeholder="Surat Permohonan" className="w-full p-3 border border-gray-300 rounded-md bg-white" required/>
            </div>
            {requirement?.document_active && <div className="flex flex-col gap-1">
                <label htmlFor="file" className="font-semibold">Dokumen</label>
                <input type="file" id="file" name="file" className="w-full p-3 border border-gray-300 rounded-md bg-white" accept="application/pdf,application/x-rar-compressed,application/zip" required/>
                <p className="text-xs text-gray-500">Format file: PDF, RAR, ZIP | Maksimal ukuran file: 5MB</p>
            </div>}
            <Button type="submit" className="w-full p-3 bg-green-500 text-white rounded-md mt-5 hover:bg-green-600" disabled={loading}>{loading ? <LoaderCircle className="w-5 h-5 mr-2 animate-spin" /> : "Kirim"}</Button>
        </form> 
        </div>
    );
}