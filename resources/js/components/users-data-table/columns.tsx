import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Email Verified At',
    }
];