const getMax = (data: number[]): number => data.reduce((max, item) => (item > max) ? item : max, 0);

export default getMax;