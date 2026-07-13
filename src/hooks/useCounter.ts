import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Time = {
    years: number;
    months: number;
    days: number;
};

export function useCounter() {
    const [time, setTime] = useState<Time>({ years: 0, months: 0, days: 0 });

    useEffect(() => {
        async function fetchSettings() {
            const { data } = await supabase.from("settings").select("started_at").single();

            if (data) {
                const duration = intervalToDuration({ start: new Date(data.started_at), end: new Date() });

                setTime({
                    years: duration.years || 0,
                    months: duration.months || 0,
                    days: duration.days || 0,
                });
            }
        }

        fetchSettings();
    }, []);

    return time;
}
