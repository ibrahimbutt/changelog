import SectionFormatter from "../../src/formatters/sectionFormatter";
import Commit from "../../src/commit";

const data = require("../data");

jest.mock("../../src/commit");

describe("SectionFormatter", () => {
  beforeEach(() => {
    Commit.mockClear();
  });

  describe("#format", () => {
    test(`returns '### Added ${
      data.formattedCommits.feature.standard
    }'`, () => {
      Commit.mockImplementation(() => {
        return {
          getDetails: () => data.commits.feature.standard,
          getScope: () => false,
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [
        new Commit(data.commits.feature.standard)
      ];

      const expected: string = `### Added\n\n${
        data.formattedCommits.feature.standard
      }\n`;
      const actual: string = SectionFormatter.format("Added", commits);

      expect(actual).toEqual(expected);
    });

    test(`returns '### Fixed ${data.formattedCommits.bugfix.standard}'`, () => {
      Commit.mockImplementation(() => {
        return {
          getDetails: () => data.commits.bugfix.standard,
          getScope: () => false,
          getDate: () => "Fri, 21 Jun 2019 18:57:10 +0100"
        };
      });

      const commits: Array<Commit> = [new Commit(data.commits.bugfix.standard)];

      const expected: string = `### Added\n\n${
        data.formattedCommits.bugfix.standard
      }\n`;
      const actual: string = SectionFormatter.format("Added", commits);

      expect(actual).toEqual(expected);
    });
  });
});
