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
    const [date, setDate] = useState("");
    const [settingsId, setSettingsId] = useState("");

    async function fetchSettings() {
        const { data } = await supabase.from("settings").select("id, started_at").single();

        if (data) {
            setDate(data.started_at);
            setSettingsId(data.id);

            const duration = intervalToDuration({ start: new Date(data.started_at), end: new Date() });

            setTime({
                years: duration.years || 0,
                months: duration.months || 0,
                days: duration.days || 0,
            });
        }
    }

    async function handleSave() {
        await supabase.from("settings").update({ started_at: date }).eq("id", settingsId);

        const duration = intervalToDuration({ start: new Date(date), end: new Date() });

        setTime({
            years: duration.years || 0,
            months: duration.months || 0,
            days: duration.days || 0,
        });
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    return { time, date, setDate, handleSave };
}
