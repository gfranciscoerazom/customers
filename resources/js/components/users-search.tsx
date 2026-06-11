import { getQueryParam, updateQueryParam } from "@/lib/utils";
import users from "@/routes/users";
import { router } from "@inertiajs/core";
import { Eraser } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UsersSearch() {
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchValue = getQueryParam("search");

    const navigateUsers = (
        params: Record<string, string> = {},
        options: Parameters<typeof router.get>[2] = {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        }
    ) => {
        router.get(users.index(), params, options);
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                name="search"
                placeholder="Search users..."
                onChange={(e) => {
                    const userInput = e.currentTarget.value;

                    if (timeoutIdRef.current) {
                        clearTimeout(timeoutIdRef.current);
                    }

                    timeoutIdRef.current = setTimeout(() => {
                        navigateUsers(updateQueryParam("search", userInput));
                    }, 250);
                }}
                defaultValue={searchValue}
            />
            <Button
                variant="outline"
                onClick={() => {
                    if (timeoutIdRef.current) {
                        clearTimeout(timeoutIdRef.current);
                    }

                    navigateUsers({}, { replace: true });
                }}
            >
                <Eraser />
                Clear Filter
            </Button>
        </div>

    );
}