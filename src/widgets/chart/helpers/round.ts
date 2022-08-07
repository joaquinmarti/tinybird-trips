const round = (value: number, precision: number): number => Math.ceil(value / precision) * precision;

export default round;