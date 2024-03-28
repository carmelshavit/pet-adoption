const { doCalc } = require("./mock");
const randModule = require("./rand");

const randModuleSpy = jest.spyOn(randModule, "rand").mockImplementation();

describe("Test mock", () => {
  it.only("will validate doCalc valid", () => {
    //randModuleSpy.mockReturnValue(176);

    const result = doCalc(10);

    expect(result).toEqual(
      expect.objectContaining({
        result: 110,
      })
    );

    expect(randModuleSpy).toHaveBeenCalledTimes(1);
  });

  it("will validate doCalc non-valid", () => {
    rand.mockReturnValue(144);

    const result = doCalc(10);

    expect(result).toEqual(
      expect.objectContaining({
        result: 110,
        valid: "not-valid",
      })
    );
  });
});
