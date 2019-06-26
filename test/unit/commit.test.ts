import Commit from "../../src/commit";
const data = require("../data");

describe("Commit", () => {
  describe("#getDetails", () => {
    test(`returns '${data.commits.bugfix.standard}'`, () => {
      const expected = data.commits.feature.standard;

      const commit = new Commit(data.commits.feature.standard);
      const actual = commit.getDetails();

      expect(actual).toEqual(expected);
    });

    test(`returns '${data.commits.bugfix.standard}'`, () => {
      const expected = data.commits.bugfix.standard;

      const commit = new Commit(data.commits.bugfix.standard);
      const actual = commit.getDetails();

      expect(actual).toEqual(expected);
    });
  });

  describe("#getType", () => {
    describe(`Given '${data.commits.feature.standard}'`, () => {
      test(`returns 'feat'`, () => {
        const expected = "feat";

        const commit = new Commit(data.commits.feature.standard);
        const actual = commit.getType();

        expect(actual).toEqual(expected);
      });
    });

    describe(`Given '${data.commits.bugfix.stanard}'`, () => {
      test(`returns 'fix'`, () => {
        const expected = "fix";

        const commit = new Commit(data.commits.bugfix.standard);
        const actual = commit.getType();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("#getScope", () => {
    describe(`Given '${data.commits.feature.scoped}'`, () => {
      test(`returns 'scoped'`, () => {
        const expected = "scoped";

        const commit = new Commit(data.commits.feature.scoped);
        const actual = commit.getScope();

        expect(actual).toEqual(expected);
      });
    });

    describe(`Given '${data.commits.bugfix.scoped}'`, () => {
      test(`returns 'scoped'`, () => {
        const expected = "scoped";

        const commit = new Commit(data.commits.bugfix.scoped);
        const actual = commit.getScope();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("#getDate", () => {
    describe(`Given '${data.commits.feature.scoped}'`, () => {
      test(`returns '21 Jun 2019'`, () => {
        const expected = "21 Jun 2019";

        const commit = new Commit(data.commits.feature.scoped);
        const actual = commit.getDate();

        expect(actual).toEqual(expected);
      });
    });
  });
});
