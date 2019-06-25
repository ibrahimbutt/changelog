const { execSync } = require("child_process");

import VersionFormatter from "../../src/formatters/versionFormatter";

describe("VersionFormatter", () => {
  describe("#format", () => {
    test("returns version sections", () => {
      const commits = [
        { getDetails: () => "chore(release): v1.0.0 (tag: v1.0.0)" },
        { getDetails: () => "feat: option to hide device serial" }
      ];

      const actual = VersionFormatter.format(commits);

      const expected =
        "## v1.0.0\n\n" +
        "### Added\n\n" +
        "- option to hide device serial\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n";
      expect(actual).toEqual(expected);
    });

    test("returns version sections", () => {
      const commits = [
        { getDetails: () => "chore(release): v1.0.0 (tag: v1.0.0)" },
        { getDetails: () => "feat: device serial getter" }
      ];

      const actual = VersionFormatter.format(commits);

      const expected =
        "## v1.0.0\n\n" +
        "### Added\n\n" +
        "- device serial getter\n" +
        "\n" +
        "### Fixed\n\n" +
        "\n";

      expect(actual).toEqual(expected);
    });
  });
});
