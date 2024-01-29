
export const arrayReps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 30, "Max"];
export const arrayTime = [15, 30, 60, 90, 120, "Max"];
export const arrayWeights = ["Libre", "Banda", 2.5, 5, 7.5, 10, 12, 15, 17.5, 20, 22.5, 25, 37.5, 30, 35, 40, 45, 50];

export const arraySeries = [1, 2, 3, 4, 5, 6].map(number => ({
    label: number.toString(),
    value: number
}))

export const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
};