import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/users-data-table/columns';
import UsersSearch from '@/components/users-search';
import users from '@/routes/users';
import { PageLinkItem, User } from '@/types';
import { Head } from '@inertiajs/react';

type UsersPaginated = {
    readonly data: User[];
    readonly links: PageLinkItem[];
};

type IndexProps = {
    readonly users: UsersPaginated;
};

export default function Index({ users }: IndexProps) {
    return (
        <>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UsersSearch />
                <DataTable columns={columns} data={users.data} links={users.links} />
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

