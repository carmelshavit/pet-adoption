const { addFronBack } = require("./special");

describe("Tesing special.js", () => {
  it("will validate addFronBack", () => {
    const result = addFronBack("hello", "RR");
    expect(result).toBe("RRhelloRR");
  });

  it("will validate addFrontBack withou prefix", () => {
    const result = addFronBack("hello");
    expect(result).toBe("--hello--");
  });
  it("will validate fetchTodo", async () => {
    const result = await fetchTodo();
    expect(result).toEqual(
      expect.arrayContaining([
        { completed: false, id: 1, title: "delectus aut autem", userId: 1 },
      ])
    );
  });
});
