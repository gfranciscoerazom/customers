import type { InertiaLinkProps } from '@inertiajs/react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function updateQueryParam(
    key: string,
    value: string,
): Record<string, string> {
    if (typeof window === 'undefined') {
        return { [key]: value };
    }

    const params = new URLSearchParams(window.location.search);

    params.set(key, value);

    return Object.fromEntries(params.entries());
}

export function getQueryParam(
    key: string,
    defaultValue: string | undefined = undefined,
): string | undefined {
    if (typeof window === 'undefined') {
        return defaultValue;
    }

    return new URLSearchParams(window.location.search).get(key) ?? defaultValue;
}
