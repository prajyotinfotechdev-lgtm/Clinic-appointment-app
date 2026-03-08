"use client";

import { useState, useEffect } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Return null on server and first render
    }

    return <>{children}</>;
}
