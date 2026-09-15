export const padNumber = (num: number, targetLength = 2): string => {
    return num.toString().padStart(targetLength, "0");
};
