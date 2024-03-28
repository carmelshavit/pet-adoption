const { add, mult, sub, divide } = require("./example");

describe("My first test", () => {
  it("will test that jest is running", () => {
    expect(true).toBe(true);
  });

  it.only("hello")

  it("will try to add -10 and 15", () => {
    expect(add(-10, 15)).toBe(5);
    expect(add(-10, 12)).toBe(2);
    expect(add(10, 15)).toBe(25);
    expect(add(33, 33)).toBe(66);
    expect(add(-33, -33)).toBe(-66);
    expect(add("10", "11")).toBe(21);
    expect(add("hello", 10)).toBe(0);
    expect(add(10, "hello")).toBe(0);
    expect(add(null, 10)).toBe(0);
  });
  it("will try to mult -10 and 15", () => {
    expect(mult(-10, 15)).toBe(5);
    expect(mult(10, "hello")).toBe(0);
    expect(mult(null, 10)).toBe(0);
  });
  it("will try to sub -10 and 15", () => {
    expect(sub(-10, 15)).toBe(5);
    expect(sub(10, "hello")).toBe(0);
    expect(sub(null, 10)).toBe(0);
  });
  it("will try to divide -10 and 15", () => {
    expect(divide(-10, 15)).toBe(5);
    expect(divide(10, "hello")).toBe(0);
    expect(divide(null, 10)).toBe(0);
  });
});
