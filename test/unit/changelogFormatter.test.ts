import ChangelogFormatter from "../../src/changelogFormatter";
const testData = require("../lib/data");

describe("ChangeLog Formatter", () => {
  describe("#format", () => {
    test("returns '- feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- feat: option to hide device serial 4e179e4\n";

      expect(actual).toContain(expected);
    });

    test("contains '- fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toContain(expected);
    });

    test("returns '### Added - feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected =
        "### Added\n\n- feat: option to hide device serial 4e179e4\n";

      expect(actual).toContain(expected);
    });

    test("returns '### Fixed - fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected =
        "## Fixed\n\n- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toContain(expected);
    });

    test("returns expected content", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial 4e179e4" },
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];
      const actual = ChangelogFormatter.format(commits);

      const expected =
        "### Added\n\n" +
        "- feat: option to hide device serial 4e179e4\n" +
        "\n" +
        "### Fixed\n\n" +
        "- fix: retrieve device name correctly c4a49e1\n";

      expect(actual).toContain(expected);
    });

    describe("When commits subjects have substrings that match commit types", () => {
      test("categorise 'feat: changelogs have added and fixed sections d5ad74a' as Added", () => {
        const commits = [
          { getDetails: () => testData.releases.second },
          {
            getDetails: () =>
              "feat: changelogs have added and fixed sections d5ad74a"
          }
        ];
        const actual = ChangelogFormatter.format(commits);

        const expected =
          "### Added\n\n" +
          "- feat: changelogs have added and fixed sections d5ad74a\n";

        expect(actual).toContain(expected);
      });
    });

    test("returns version sections", () => {
      const commits = [
        { getDetails: () => "chore(release): v1.0.0 4e179b4 (tag: v1.0.0)" },
        { getDetails: () => "feat: option to hide device serial 4e179e4" },
        { getDetails: () => "chore(release): v.1.0 90010ed (tag: v0.1.0)" },
        { getDetails: () => "feat: device serial getter 90010eb" }
      ];
      const actual = ChangelogFormatter.format(commits);

      const expected =
        "## v1.0.0\n\n" +
        "### Added\n\n" +
        "- feat: option to hide device serial 4e179e4\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n" +
        "## v0.1.0\n\n" +
        "### Added\n\n" +
        "- feat: device serial getter 90010eb\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n";

      expect(actual).toEqual(expected);
    });
  });
});
