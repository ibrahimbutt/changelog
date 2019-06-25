import SectionFormatter from "../../src/sectionFormatter";

describe("SectionFormatter", () => {
  describe("#format", () => {
    test("returns '### Added - option to hide device serial'", () => {
      const commits = [
        {
          getDetails: () => "feat: option to hide device serial"
        }
      ];
      const expected = "### Added\n\n- option to hide device serial\n";
      const actual = SectionFormatter.format("Added", commits);
      expect(actual).toEqual(expected);
    });

    test("returns '### Added - device serial getter'", () => {
      const commits = [
        {
          getDetails: () => "feat: device serial getter"
        }
      ];
      const expected = "### Added\n\n- device serial getter\n";
      const actual = SectionFormatter.format("Added", commits);
      expect(actual).toEqual(expected);
    });
  });
});
