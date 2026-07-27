import { intervalToDuration, parseISO } from "date-fns";

export const calculateTimeDifference = (startDate: string) => {
    const start = parseISO(startDate);
    const now = new Date();
    const duration = intervalToDuration({ start, end: now });

    return {
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
    };
};
