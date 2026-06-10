import users from "@/routes/users";
import { PageLinkeItem } from "@/types";
import { router } from "@inertiajs/core";
import { Field, FieldLabel } from "./field";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";

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
        <div className="flex items-center justify-between gap-4 mt-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                <Select defaultValue="10" onValueChange={(value) => router.get(
                    users.index(),
                    {
                        perPage: value
                    },
                    {
                        preserveState: true,
                        replace: true,
                        preserveScroll: true,
                    })}>
                    <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start" position="item-aligned">
                        <SelectGroup>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
            <Pagination className="mx-0 w-auto">
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
        </div>
    );
}
