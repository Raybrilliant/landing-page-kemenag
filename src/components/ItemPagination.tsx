import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination"

interface ItemPaginationProps {
    page: number;
    totalPage: number;
    getPageUrl: (p: number) => string;
    onPageChange?: (page: number) => void;
  }
  
  export const ItemPagination = ({ page, totalPage, getPageUrl, onPageChange }: ItemPaginationProps) => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    return (
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {pages.map((item) => (
                <PaginationLink
                  key={item}
                  href={getPageUrl(item)}
                  onClick={(e) => {
                    if (onPageChange) {
                      e.preventDefault();
                      onPageChange(item);
                    }
                  }}
                  isActive={page === item}
                >
                  {item}
                </PaginationLink>
              ))}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };  