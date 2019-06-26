import CommitFormatter from "../../src/formatters/commitsFormatter";

describe("CommitFormatter", () => {
  describe("#format", () => {
    test("returns '- option to hide device serial'", () => {
      const commit = [
        {
          getDetails: () => "feat: option to hide device serial"
        }
      ];
      const expected = "- option to hide device serial\n";
      const actual = CommitFormatter.format(commit);
      expect(actual).toEqual(expected);
    });

    test("returns '- device serial getter'", () => {
      const commit = [
        {
          getDetails: () => "feat: device serial getter"
        }
      ];

      const expected = "- device serial getter\n";
      const actual = CommitFormatter.format(commit);
      expect(actual).toEqual(expected);
    });

    test("returns '- retrieve device name correctly'", () => {
      const commit = [
        {
          getDetails: () => "fix: retrieve device name correctly"
        }
      ];

      const expected = "- retrieve device name correctly\n";
      const actual = CommitFormatter.format(commit);
      expect(actual).toEqual(expected);
    });

    test("returns '- device serial getter - retrieve device name correctly'", () => {
      const commit = [
        { getDetails: () => "fix: device serial getter" },
        {
          getDetails: () => "fix: retrieve device name correctly"
        }
      ];

      const expected =
        "- device serial getter\n- retrieve device name correctly\n";
      const actual = CommitFormatter.format(commit);
      expect(actual).toEqual(expected);
    });

    describe("When commit has a scope", () => {
      test("returns '- *device*: device serial getter'", () => {
        const commit = [
          { getDetails: () => "fix(device): device serial getter" }
        ];

        const expected = "- *device*: device serial getter\n";
        const actual = CommitFormatter.format(commit);
        expect(actual).toEqual(expected);
      });
    });
  });
});
