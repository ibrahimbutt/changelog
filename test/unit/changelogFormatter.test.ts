import ChangelogFormatter from "../../src/changelogFormatter";
const testData = require("../lib/data");

describe("ChangeLog Formatter", () => {
  describe("#format", () => {
    test("returns '- feat: option to hide device serial'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- feat: option to hide device serial\n";

      expect(actual).toContain(expected);
    });

    test("contains '- fix: retrieve device name correctly'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "fix: retrieve device name correctly" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "- fix: retrieve device name correctly\n";

      expect(actual).toContain(expected);
    });

    test("returns '### Added - feat: option to hide device serial'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "### Added\n\n- feat: option to hide device serial\n";

      expect(actual).toContain(expected);
    });

    test("returns '### Fixed - fix: retrieve device name correctly'", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "fix: retrieve device name correctly" }
      ];

      const actual = ChangelogFormatter.format(commits);
      const expected = "## Fixed\n\n- fix: retrieve device name correctly\n";

      expect(actual).toContain(expected);
    });

    test("returns expected content", () => {
      const commits = [
        { getDetails: () => testData.releases.second },
        { getDetails: () => "feat: option to hide device serial" },
        { getDetails: () => "fix: retrieve device name correctly" }
      ];
      const actual = ChangelogFormatter.format(commits);

      const expected =
        "### Added\n\n" +
        "- feat: option to hide device serial\n" +
        "\n" +
        "### Fixed\n\n" +
        "- fix: retrieve device name correctly\n";

      expect(actual).toContain(expected);
    });

    describe("When commits subjects have substrings that match commit types", () => {
      test("categorise 'feat: changelogs have added and fixed sections' as Added", () => {
        const commits = [
          { getDetails: () => testData.releases.second },
          {
            getDetails: () => "feat: changelogs have added and fixed sections"
          }
        ];
        const actual = ChangelogFormatter.format(commits);

        const expected =
          "### Added\n\n" +
          "- feat: changelogs have added and fixed sections\n";

        expect(actual).toContain(expected);
      });
    });

    test("returns version sections", () => {
      const commits = [
        { getDetails: () => "chore(release): v1.0.0 (tag: v1.0.0)" },
        { getDetails: () => "feat: option to hide device serial" },
        { getDetails: () => "chore(release): v.1.0 (tag: v0.1.0)" },
        { getDetails: () => "feat: device serial getter" }
      ];
      const actual = ChangelogFormatter.format(commits);

      const expected =
        "## v1.0.0\n\n" +
        "### Added\n\n" +
        "- feat: option to hide device serial\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n" +
        "## v0.1.0\n\n" +
        "### Added\n\n" +
        "- feat: device serial getter\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n";

      expect(actual).toEqual(expected);
    });
  });
});
