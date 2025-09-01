import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from './ui/button';

export const Penilaian = ({layananId}: {layananId: string}) => {
    const [rating, setRating] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleStarClick = (ratingValue: number) => {
        setRating(ratingValue);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            formData.append("category", layananId);
            const response = await fetch("/api/penilaian", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log("Data berhasil dikirim");
                setSuccess(true);
            } else {
                console.log("Gagal mengirim data");
            }
        } catch (error) {
            console.log("Gagal mengirim data");
        }
        setLoading(false);
    };



    return (
                <Card>
                    <CardContent>
                        <form id="ratingForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Tampilkan ID layanan */}
                            <div className="flex items-center gap-2">
                                <p className="font-medium">Nomor Layanan:</p>
                                <input
                                    type="text"
                                    id="layananId"
                                    name="layananId"
                                    value={layananId}
                                    readOnly
                                />
                            </div>

                            {/* Rating bintang */}
                            <div id="starContainer" className="flex items-center mx-auto gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        data-star={i + 1}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className={`w-20 h-20 max-sm:w-10 max-sm:h-10 cursor-pointer transition-colors ${rating >= i + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
                                        onClick={() => handleStarClick(i + 1)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 17.27l5.18 3.73-1.64-5.81L21 9.24l-5.9-.51L12 3 8.9 8.73 3 9.24l4.46 5.95-1.64 5.81L12 17.27z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <input type="hidden" name="rating" id="ratingValue" value={rating} required />
                            <p className="text-sm text-center text-gray-500">1 = Sangat Buruk, 5 = Sangat Baik</p>

                            {/* Tombol submit */}
                            <Button
                                type="submit"
                                className="w-full py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition"
                            >
                                {loading ? <LoaderCircle className="w-5 h-5 mr-2 animate-spin" /> : "Nilai Layanan"}
                            </Button>
                        </form>

                        {/* Pesan hasil */}
                        {success && (
                            <div id="result" className="mt-5 bg-green-200 p-4 rounded-md">
                                <p>Terima kasih telah memberikan penilaian, semoga dipermudah segala urusan.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
    );
};
