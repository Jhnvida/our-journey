import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAppPreloader() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function preloadCriticalAssets() {
            try {
                const [timelineRes, kitchenRes] = await Promise.all([
                    supabase.from("timeline_events").select("image_url").order("date", { ascending: true }).limit(4),
                    supabase.from("recipes").select("image_url").order("created_at", { ascending: false }).limit(4),
                ]);

                const imageUrls: string[] = [];

                if (timelineRes.data) {
                    imageUrls.push(...(timelineRes.data.map((e) => e.image_url).filter(Boolean) as string[]));
                }

                if (kitchenRes.data) {
                    imageUrls.push(...(kitchenRes.data.map((r) => r.image_url).filter(Boolean) as string[]));
                }

                const imagePromises = imageUrls.map((url) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = url;
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                });

                const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500));

                await Promise.all([...imagePromises, minTimePromise]);

                if (isMounted) {
                    setIsReady(true);
                }
            } catch (error) {
                console.error("Failed to preload assets:", error);
                if (isMounted) setIsReady(true);
            }
        }

        preloadCriticalAssets();

        return () => {
            isMounted = false;
        };
    }, []);

    return { isReady };
}
