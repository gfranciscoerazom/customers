import { getQueryParam, updateQueryParams } from "@/lib/utils";
import users from "@/routes/users";
import { User } from "@/types";
import { router } from "@inertiajs/core";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: () => <div className="text-right">ID</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium">{row.getValue('id')}</div>;
        }
    },
    {
        accessorKey: 'name',
        header: () => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => router.get(users.index(), updateQueryParams({
                        sort: "name",
                        order: getQueryParam("order") === "asc" ? "desc" : "asc",
                    }), {
                        preserveState: true,
                        replace: true,
                        preserveScroll: true,
                    })}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email',
        header: () => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => router.get(users.index(), updateQueryParams({
                        sort: "email",
                        order: getQueryParam("order") === "asc" ? "desc" : "asc",
                    }), {
                        preserveState: true,
                        replace: true,
                        preserveScroll: true,
                    })}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Email Verified At',
        cell: ({ row }) => {
            const value = row.getValue('email_verified_at');
            return value ? <Badge>Verified</Badge> : <Badge variant="destructive">Not Verified</Badge>;
        }
    },
    {
        accessorKey: 'created_at',
        header: () => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => router.get(users.index(), updateQueryParams({
                        sort: "created_at",
                        order: getQueryParam("order") === "asc" ? "desc" : "asc",
                    }), {
                        preserveState: true,
                        replace: true,
                        preserveScroll: true,
                    })}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.getValue('created_at');
            return new Date(value as string).toLocaleDateString();
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id.toString())}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];