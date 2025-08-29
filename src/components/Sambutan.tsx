import pb from "@/lib/database";
import { BlurFade } from "./magicui/blur-fade"
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Kepala {
    id: string;
    name: string;
    document: string;
}

export const Sambutan = () => {
    const [kepala, setKepala] = useState<Kepala>();
    const [loading, setLoading] = useState(true);

    const getKepala = async () => {
        const res = await pb.collection("organizations").getFullList({expand: "category", filter: "category.name = 'Kepala Kantor'" });
        setKepala(res[0] as any);
        setLoading(false);
    };
    
    useEffect(() => {
        getKepala();
    }, []);
    
    return (
        <section>
            {loading ? (
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mx-20 max-sm:mx-5 my-20 max-sm:my-10 items-center">
                    <Skeleton className="w-full h-32 bg-white" />
                    <div>
                        <Skeleton className="w-full h-32 bg-white" />
                        <Skeleton className="w-full h-32 bg-white" />
                        <Skeleton className="w-full h-32 bg-white" />
                    </div>
                </div>
            ) : (
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 mx-20 max-sm:mx-5 my-20 max-sm:my-10 items-center">
			<BlurFade delay={0.5} inView direction="up">
			<img src={kepala ? pb.files.getURL(kepala,kepala.document) : ""} className="rounded-xl mx-auto" alt="kepala" width={400} height={400} />
			</BlurFade>
			<div>
				<p className="text-3xl font-bold">{kepala?.name}</p>
				<p className="font-semibold opacity-70">Kepala Kementerian Agama Kota Probolinggo</p>
				<article className="mt-3 text-justify">
					Assalamualaikum Warahmatullahi Wabarakatuh, <br />
					Salam sejahtera untuk kita semua. <br /><br />
					Kami ucapkan terima kasih atas kepercayaan masyarakat Kota Probolinggo kepada Kementerian Agama. Website ini kami hadirkan sebagai media pelayanan yang transparan, mudah diakses, dan gratis untuk seluruh warga. <br /><br />
					Kami berkomitmen memberikan layanan terbaik dengan mengutamakan kecepatan, kejelasan informasi, dan kenyamanan masyarakat dalam mengurus kebutuhan keagamaan. <br /><br />
					Mari manfaatkan layanan ini sebaik-baiknya, dan sampaikan masukan agar kami terus dapat memperbaiki pelayanan. <br /><br />
					Wassalamualaikum Warahmatullahi Wabarakatuh.
				</article>
			</div>
			</div>
            )}
        </section>
    );
}