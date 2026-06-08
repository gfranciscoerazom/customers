import { PageLinkeItem } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";

type DataTablePaginationProps = {
    links: PageLinkeItem[];
};

export function DataTablePagination({ links }: DataTablePaginationProps) {
    const activeLink = links.findIndex((link) => link.active);
    const paginationItems = links.slice(
        Math.max(activeLink - 1, 1),
        Math.min(activeLink + 2, links.length - 1),
    );

    if (links.length === 0) {
        return null;
    }

    return (
        <Pagination className="flex items-center justify-end space-x-2 py-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={links[0]?.url || "#"} />
                </PaginationItem>

                {paginationItems.length > 0 && paginationItems[0].label !== "1" && (
                    <>
                        <PaginationItem>
                            <PaginationLink href={links[1]?.url || "#"} isActive={links[1]?.active}>
                                {links[1]?.label}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {paginationItems.map((link, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={link.url || "#"} isActive={link.active}>
                            {link.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {paginationItems.length > 0 && paginationItems[paginationItems.length - 1].label !== links[links.length - 2].label && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href={links[links.length - 2]?.url || "#"}
                                isActive={links[links.length - 2]?.active}
                            >
                                {links[links.length - 2]?.label}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext href={links[links.length - 1]?.url || "#"} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
