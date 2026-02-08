/**
 * shuffle an array and return a new array.
 * @param array the array to be shuffled.
 * @returns a new array with shiffled elements.
 */
export function shuffle<T>(array: readonly T[]) : T[] 
{
    const result = [...array]

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }

    return result
}