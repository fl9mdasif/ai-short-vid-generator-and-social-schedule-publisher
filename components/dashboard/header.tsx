"use client";

import { UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <header className="flex h-16 w-full items-center justify-end px-6 border-b bg-white">
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: "h-10 w-10"
                    }
                }}
            />
        </header>
    );
}
