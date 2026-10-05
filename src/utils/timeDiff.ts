import { differenceInDays, intervalToDuration, parseISO } from "date-fns";

export const timeDiff = (startDate: string) => {
    const start = parseISO(startDate);
    const now = new Date();
    const duration = intervalToDuration({ start, end: now });
    const totalDays = differenceInDays(now, start);

    return {
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
        totalDays: totalDays >= 0 ? totalDays : 0,
    };
};
