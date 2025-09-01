import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card"
import { useState } from "react";
import pb from "@/lib/database";

interface Data {
    id: string;
    name: string;
    status: string;
    response_document: string;
}

export const ProgresCek = () => {
    const [result, setResult] = useState<Data>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);
        try {
            const res = await fetch("/api/progres", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                setResult(data);
            } else {
                console.log("Gagal mengirim data");
            }
        } catch (error) {
            console.log("Gagal mengirim data");
        }
        setLoading(false);
    }

    return (
        <Card>
            <CardContent>
                <div className="p-4 bg-yellow-200 text-sm rounded-md mb-5 font-medium"> Masukan Nomor Pelayanan/Laporan untuk mengecek Progres Pelayanan Anda. Nomor Pelayanan didapat ketika Anda mengirim layanan atau laporan.</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="text" name="id" id="" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Nomor Pelayanan/Laporan"/>
                    <Button type="submit" className="w-full py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600" disabled={loading}>{loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Cek Progres"}</Button>
                </form>
                {result && (
                    <div id="result" className="mt-5 bg-green-200 p-4 rounded-md">
                        <p>Nomor Pelayanan/Pelaporan: <span id="result-number" className="font-bold">{result?.id}</span></p>
                        <p>Progres Pelayanan atau pelaporan anda <span id="result-text" className="font-bold">{result?.status}</span>.</p>
                        {result.status == 'selesai' && result.response_document && <p>Hasil Layanan anda dapat di unduh: <a href={pb.files.getURL(result,result.response_document)} target="_blank" className="text-blue-500">Lihat Dokumen</a></p>}
                        <p>Mohon agar dapat mengisi kuisioner penilaian layanan setelah layanan selesai. <a href={`/penilaian?id=${result?.id}`} className="text-blue-500">Klik disini</a></p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}