import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { columns } from '@/components/users-data-table/columns';
import users, { default as usersRoutes } from '@/routes/users';
import { PageLinkeItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Eraser } from 'lucide-react';

type UsersPaginated = {
    readonly data: User[];
    readonly links: PageLinkeItem[];
};

type Filters = {
    readonly search: string;
};

type IndexProps = {
    readonly users: UsersPaginated;
    readonly filters: Filters;
};

export default function Index({ users, filters }: IndexProps) {
    return (
        <>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search users..."
                        onChange={(e) => {
                            const userInput = e.currentTarget.value;
                            router.get(
                                usersRoutes.index(),
                                userInput ? { search: userInput } : {},
                                { preserveState: true, replace: true, preserveScroll: true }
                            );
                        }
                        }
                    />
                    <Button
                        variant="outline"
                        onClick={() => {
                            router.get(
                                usersRoutes.index(),
                                {},
                                { replace: true }
                            );
                        }}
                    >
                        <Eraser />
                        Clear Filter
                    </Button>
                </div>
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

