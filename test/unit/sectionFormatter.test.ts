import SectionFormatter from "../../src/formatters/sectionFormatter";
import CommitsFormatter from "../../src/formatters/commitsFormatter";
import Commit from "../../src/commit";

const data = require("../data");

jest.mock("../../src/commit", () => {
  return jest.fn();
});

jest.mock("../../src/formatters/commitsFormatter");

describe("SectionFormatter", () => {
  beforeEach(() => {
    CommitsFormatter.format.mockReturnValue(
      "- stubbed return of CommitsFormatter"
    );
  });

  describe("#format", () => {
    test(`returns '### Added\\n\\n- stubbed return of CommitsFormatter'`, () => {
      const commits: Array<Commit> = [
        new Commit(data.commits.feature.standard)
      ];

      const expected: string = `### Added\n\n- stubbed return of CommitsFormatter`;
      const actual: string = SectionFormatter.format("Added", commits);

      expect(actual).toContain(expected);
    });

    test(`returns '### Fixed\\n\\n- stubbed return of CommitsFormatter'`, () => {
      const commits: Array<Commit> = [new Commit(data.commits.bugfix.standard)];

      const expected: string = `### Fixed\n\n- stubbed return of CommitsFormatter`;
      const actual: string = SectionFormatter.format("Fixed", commits);

      expect(actual).toEqual(expected);
    });
  });
});
