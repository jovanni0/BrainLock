/**
 * calculates the progress value, in percentages.
 * @returns the completion percentage.
 */
export function CalcFillerPercentage(current: number, total: number) : number
{
    const percentage = Math.ceil(current / total * 100)
    const finalValue = Math.trunc(percentage)
    
    return finalValue;
}