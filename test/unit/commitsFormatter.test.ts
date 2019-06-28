import CommitsFormatter from "../../src/formatters/commitsFormatter";
import Commit from "../../src/commit";
const data = require("../data");

jest.mock("../../src/commit");

describe("Commits", () => {
  beforeEach(() => {
    Commit.mockClear();
  });

  describe("#format", () => {
    test(`returns '${data.formattedCommits.feature.standard}'`, () => {
      Commit.mockImplementation(() => {
        return {
          getDetails: () => data.commits.feature.standard,
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.feature.standard)
      ];

      const expected: string = `${data.formattedCommits.feature.standard}\n`;
      const actual: string = CommitsFormatter.format(commits);

      expect(actual).toEqual(expected);
    });

    test("returns '- device serial getter'", () => {
      Commit.mockImplementation(() => {
        return {
          getDetails: () => "feat: device serial getter",
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [new Commit("feat: device serial getter")];

      const expected: string = "- device serial getter\n";
      const actual: string = CommitsFormatter.format(commits);

      expect(actual).toEqual(expected);
    });

    test("returns '- retrieve device name correctly'", () => {
      Commit.mockImplementation(() => {
        return {
          getDetails: () => "fix: retrieve device name correctly",
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [new Commit("feat: device serial getter")];

      const expected: string = "- retrieve device name correctly\n";
      const actual: string = CommitsFormatter.format(commits);

      expect(actual).toEqual(expected);
    });

    test("returns '- device serial getter - retrieve device name correctly'", () => {
      Commit.mockImplementationOnce(() => {
        return {
          getDetails: () => "fix: device serial getter",
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      }).mockImplementationOnce(() => {
        return {
          getDetails: () => "fix: retrieve device name correctly",
          getScope: () => false,
          getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit("fix: device serial getter"),
        new Commit("fix: retrieve device name correctly")
      ];

      const expected: string =
        "- device serial getter\n- retrieve device name correctly\n";
      const actual: string = CommitsFormatter.format(commits);

      expect(actual).toEqual(expected);
    });

    describe("When commit has a scope", () => {
      test("returns '- **device**: device serial getter'", () => {
        Commit.mockImplementation(() => {
          return {
            getDetails: () => "fix(device): device serial getter",
            getScope: () => "device",
            getTimestamp: () => "Fri, 21 Jun 2019 18:57:10 +0100"
          };
        });

        const commits: Array<Commit> = [
          new Commit("fix(device): device serial getter")
        ];

        const expected: string = "- **device**: device serial getter\n";
        const actual: string = CommitsFormatter.format(commits);

        expect(actual).toEqual(expected);
      });
    });
  });
});
