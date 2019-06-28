import ChangelogFormatter from "../../src/formatters/changelogFormatter";
import VersionFormatter from "../../src/formatters/versionFormatter";
import Commit from "../../src/commit";

jest.mock("../../src/formatters/versionFormatter");
jest.mock("../../src/commit");

const data = require("../data");

describe("ChangeLog Formatter", () => {
  describe("#format", () => {
    beforeEach(() => {
      VersionFormatter.mockClear();
      Commit.mockClear();
    });
    test("returns 'the versions formattted'", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.release.two,
          getScope: () => "release",
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      }).mockImplementation(() => {
        return {
          getDetails: () => data.commits.feature.standard,
          getScope: () => false,
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.release.two),
        new Commit(data.commits.feature.standard)
      ];

      VersionFormatter.format.mockReturnValue("the versions formattted");

      const actual: string = ChangelogFormatter.format(commits);
      const expected: string = "the versions formattted";

      expect(actual).toEqual(expected);
    });

    test("returns 'the versions formattted inlcuding new version'", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.release.two,
          getScope: () => "release",
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      }).mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.feature.standard,
          getScope: () => false,
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.release.two),
        new Commit(data.commits.feature.standard)
      ];

      VersionFormatter.format.mockReturnValue(
        "the versions formattted inlcuding new version"
      );

      const actual: string = ChangelogFormatter.format(commits);
      const expected: string = "the versions formattted inlcuding new version";

      expect(actual).toEqual(expected);
    });

    test("returns '1. the versions formattted 2. the versions formattted inlcuding new version'", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => data.commits.release.two,
          getScope: () => "release",
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100",
          v: 1
        };
      })
        .mockImplementationOnce(() => {
          return {
            getDetails: () => data.commits.feature.standard,
            getScope: () => false,
            getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100",
            v: 1
          };
        })
        .mockImplementationOnce(() => {
          return {
            getDetails: () => data.commits.release.one,
            getScope: () => "release",
            getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100",
            v: 2
          };
        })
        .mockImplementation(() => {
          return {
            getDetails: () => data.commits.feature.standard,
            getScope: () => false,
            getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100",
            v: 1
          };
        });

      const commits: Array<Commit> = [
        new Commit(data.commits.release.two),
        new Commit(data.commits.feature.standard),
        new Commit(data.commits.release.one),
        new Commit(data.commits.feature.standard)
      ];

      VersionFormatter.format
        .mockReturnValueOnce("1. the versions formattted")
        .mockReturnValue(" 2. the versions formattted inlcuding new version");

      const actual: string = ChangelogFormatter.format(commits);
      const expected: string =
        "1. the versions formattted 2. the versions formattted inlcuding new version";

      expect(actual).toEqual(expected);
    });
  });
});
