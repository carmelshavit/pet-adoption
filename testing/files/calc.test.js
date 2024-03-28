const { calc } = require("./calc")

describe("tets calc", () => {
    it('will add two numbers', () => {
        const result = calc(10, 15);
        expect(result).toBe(25);
    })

    it('will handle string as first arg', () => {
        const result = calc('hello', 15);
        expect(result).toBe(15);
    })

    it('will handle string as second arg', () => {
        const result = calc(10, 'hello');
        expect(result).toBe(10);
    })

    it('will handle null values', () => {
        const result = calc();
        expect(result).toBe(-1);
    })
})