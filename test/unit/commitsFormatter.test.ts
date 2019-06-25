import CommitFormatter from "../../src/commitsFormatter";

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
  });
});