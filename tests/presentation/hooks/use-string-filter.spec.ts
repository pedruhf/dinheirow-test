import { useStringFilterSetup } from "@/presentation/hooks";

describe("UseStringFilter Hook", () => {
  test("Shoul return a filteredArray", () => {
    let filteredArray = [];
    const sut = useStringFilterSetup((array) => { filteredArray = array });
    const array = [
      { name: "any_name" },
      { name: "another_name" },
    ]
    sut("any", array, "name");


    expect(filteredArray).toEqual([
      { name: "any_name" },
    ]);
  });
});
