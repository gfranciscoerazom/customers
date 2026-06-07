import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/users-data-table/columns';
import users from '@/routes/users';
import { User } from '@/types';
import { Head } from '@inertiajs/react';

export default function Index({ users }: { readonly users: User[]; }) {
    return (
        <>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable columns={columns} data={users} />
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        }
    ],
};

