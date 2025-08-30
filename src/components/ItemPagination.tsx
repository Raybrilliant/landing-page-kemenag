import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination"


export const ItemPagination = ({page, totalPage, category}: {page: number, totalPage: number, category: string}) => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {pages.map((item) => (
                            <PaginationLink key={item} href={`/berita/kategori/${category}?page=${item}`} isActive={page === item}>{item}</PaginationLink>
                        ))}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}