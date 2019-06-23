import ChangelogFormatter from "../../src/changelogFormatter";

describe("ChangeLog Formatter", () => {
  describe("#format", () => {
    test("returns '- feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- feat: option to hide device serial 4e179e4\n";

      expect(actual).toContain(expected);
    });

    test("contains '- fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toContain(expected);
    });

    test("returns '## Added - feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected =
        "## Added\n\n- feat: option to hide device serial 4e179e4\n";

      expect(actual).toContain(expected);
    });

    test("returns '## Fixed - fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected =
        "## Fixed\n\n- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toContain(expected);
    });

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
