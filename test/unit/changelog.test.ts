import Changelog from "../../src/changelog";

describe("Changelog", () => {
  describe("#content", () => {
    test("returns '- feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];
      const changelog = new Changelog(commits);
      const expected = "- feat: option to hide device serial 4e179e4\n";
      const actual = changelog.content();

      expect(actual).toContain(expected);
    });

    test("contains '- fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const changelog = new Changelog(commits);
      const expected = "- fix: retrieve device name correctly c4a49e1\n";
      const content = changelog.content();

      expect(content).toContain(expected);
    });

    test("returns '## Added - feat: option to hide device serial 4e179e4'", () => {
      const commits = [
        { getDetails: () => "feat: option to hide device serial 4e179e4" }
      ];

      const changelog = new Changelog(commits);
      const expected =
        "## Added\n\n- feat: option to hide device serial 4e179e4\n";
      const content = changelog.content();

      expect(content).toContain(expected);
    });

    test("returns '## Fixed - fix: retrieve device name correctly c4a49e1'", () => {
      const commits = [
        { getDetails: () => "fix: retrieve device name correctly c4a49e1" }
      ];

      const changelog = new Changelog(commits);
      const expected =
        "## Fixed\n\n- fix: retrieve device name correctly c4a49e1\n";
      const content = changelog.content();

      expect(content).toContain(expected);
    });
  });
});
