import Commit from "../../src/commit";
const data = require("../data");

describe("Commit", () => {
  describe("#getDetails", () => {
    test(`returns '${data.commits.bugfix.standard}'`, () => {
      const expected: string = data.commits.feature.standard;

      const commit: Commit = new Commit(data.commits.feature.standard);
      const actual: string = commit.getDetails();

      expect(actual).toEqual(expected);
    });

    test(`returns '${data.commits.bugfix.standard}'`, () => {
      const expected: string = data.commits.bugfix.standard;

      const commit: Commit = new Commit(data.commits.bugfix.standard);
      const actual: string = commit.getDetails();

      expect(actual).toEqual(expected);
    });
  });

  describe("#getType", () => {
    describe(`Given '${data.commits.feature.standard}'`, () => {
      test(`returns 'feat'`, () => {
        const expected: string = "feat";

        const commit: Commit = new Commit(data.commits.feature.standard);
        const actual: string = commit.getType();

        expect(actual).toEqual(expected);
      });
    });

    describe(`Given '${data.commits.bugfix.stanard}'`, () => {
      test(`returns 'fix'`, () => {
        const expected: string = "fix";

        const commit: Commit = new Commit(data.commits.bugfix.standard);
        const actual: string = commit.getType();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("#getScope", () => {
    describe(`Given '${data.commits.feature.scoped}'`, () => {
      test(`returns 'scoped'`, () => {
        const expected: string = "scoped";

        const commit: Commit = new Commit(data.commits.feature.scoped);
        const actual: string = commit.getScope();

        expect(actual).toEqual(expected);
      });
    });

    describe(`Given '${data.commits.bugfix.scoped}'`, () => {
      test(`returns 'scoped'`, () => {
        const expected: string = "scoped";

        const commit: Commit = new Commit(data.commits.bugfix.scoped);
        const actual: string = commit.getScope();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("#getDate", () => {
    describe(`Given '${data.commits.feature.scoped}'`, () => {
      test(`returns '21 Jun 2019'`, () => {
        const expected: string = "21 Jun 2019";

        const commit: Commit = new Commit(data.commits.feature.scoped);
        const actual = commit.getDate();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe(`#isRelease`, () => {
    test(`returns true`, () => {
      const expected: boolean = true;

      const commit: Commit = new Commit(data.commits.release.one);
      const actual: boolean = commit.isRelease();

      expect(actual).toEqual(expected);
    });

    test(`returns false`, () => {
      const expected: boolean = false;

      const commit: Commit = new Commit(data.commits.feature.scoped);
      const actual: boolean = commit.isRelease();

      expect(actual).toEqual(expected);
    });
  });
});
