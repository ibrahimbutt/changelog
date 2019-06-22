import ChangelogFormatter from "../../src/changelogFormatter";

describe("ChangeLog Formatter", () => {
  describe("#format", () => {
    test("returns expected content", () => {
      const commits = [
        { getDetails: () => "feat: option to hide device serial 4e179e4" },
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];
      const actual = ChangelogFormatter.format(commits);

      const expected =
        "## Added\n\n" +
        "- feat: option to hide device serial 4e179e4\n" +
        "\n" +
        "## Fixed\n\n" +
        "- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toEqual(expected);
    });
  });
});
