import Commit from "../../src/commit";

const data = require("../data");

jest.mock("../../src/commit");

import VersionFormatter from "../../src/formatters/versionFormatter";

describe("VersionFormatter", () => {
  describe("#format", () => {
    test("returns version sections", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.release.two,
          getScope: () => "release",
          getDate: () => "21 Jun 2019",
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      }).mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.feature.standard,
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.release.two),
        new Commit(data.commits.feature.standard)
      ];

      const actual: string = VersionFormatter.format(commits);
      const expected: string =
        "## v1.0.0 – 21 Jun 2019\n\n" +
        "### Added\n\n" +
        data.formattedCommits.feature.standard +
        "\n" +
        "\n";

      expect(actual).toEqual(expected);
    });

    test("returns version sections", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.release.one,
          getScope: () => "release",
          getDate: () => "21 Jun 2019",
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      }).mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.bugfix.standard,
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.release.one),
        new Commit(data.commits.bugfix.standard)
      ];

      const actual: string = VersionFormatter.format(commits);
      const expected: string =
        "## v0.1.0 – 21 Jun 2019\n\n" +
        "### Fixed\n\n" +
        data.formattedCommits.bugfix.standard +
        "\n" +
        "\n";

      expect(actual).toEqual(expected);
    });
  });
});
