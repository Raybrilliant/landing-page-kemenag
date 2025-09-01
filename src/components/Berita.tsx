
export const Berita = ({ title, slug, date, image }: { title: string; slug: string; date: string; image: string }) => {
    console.log(image);
    
    return (
        <div className="rounded-md bg-white overflow-hidden border hover:shadow-xl duration-300 grid grid-cols-2 cursor-pointer min-h-52 max-sm:min-h-40 max-sm:min-w-full">
            <img src={image} alt="berita" className="h-full object-cover object-center "/>
            <div className="space-y-2 p-5">
                <h2 className="text-lg max-sm:text-sm font-semibold max-sm:font-medium">{title}</h2>
                <p className="text-sm max-sm:text-xs">{new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <a href={`/berita/blog/${slug}`} className="text-blue-500 hover:underline text-sm max-sm:text-xs">Selengkapnya</a>
            </div>
        </div>
    );
}
