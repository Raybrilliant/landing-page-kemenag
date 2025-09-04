export const Berita = ({ 
    title, 
    slug, 
    date, 
    image, 
    className 
  }: { 
    title: string; 
    slug: string; 
    date: string; 
    image: string; 
    className?: string 
  }) => {
    return (
      <a
        href={`/berita/blog/${slug}`}
        className={`${className} rounded-md bg-white border hover:shadow-xl duration-300 flex flex-col w-72 `}
      >
        {/* gambar */}
        <img
          src={image}
          alt="berita"
          className="w-full h-36 object-cover object-center"
        />
  
        {/* konten */}
        <div className="flex flex-col flex-1 justify-between p-3">
          <div>
            <h2 className="text-base font-semibold break-words whitespace-normal">
              {title}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <span className="text-blue-500 hover:underline text-sm mt-2">
            Selengkapnya
          </span>
        </div>
      </a>
    );
  };  