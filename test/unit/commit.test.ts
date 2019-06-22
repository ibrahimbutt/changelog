import Commit from "../../src/commit";

describe("Commit", () => {
  describe("#getDetails", () => {
    test("returns 'feat: device serial getter 90010eb'", () => {
      const expected = "feat: device serial getter 90010eb";

      const commit = new Commit("feat: device serial getter 90010eb");
      const actual = commit.getDetails();

      expect(actual).toEqual(expected);
    });

    test("returns 'feat: device name getter and setter 90010eb'", () => {
      const expected = "feat: device name getter and setter 90010eb";

      const commit = new Commit("feat: device name getter and setter 90010eb");
      const actual = commit.getDetails();

      expect(actual).toEqual(expected);
    });
  });
});
