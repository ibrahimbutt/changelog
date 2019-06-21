import { CommitLog } from "../../src/commitLog";
const child_process = require("child_process");

describe("CommitLog", () => {
  test("returns expected commits", () => {
    const expected = [
      "feat: option to hide device serial 4e179e4",
      "fix: retrieve device name correctly c4a49e1"
    ];

    const expectedString = expected.toString().replace(",", "\n");
    const buffer = Buffer.from(expectedString);
    child_process.execSync = jest.fn(() => buffer);

    const commitLog = new CommitLog();

    const actual = commitLog.getCommits();
    expect(actual).toEqual(expected);
  });

  test("returns expected commits", () => {
    const expected = [
      "feat: device serial getter 90010eb",
      "feat: device name getter and setter 90010eb"
    ];

    const expectedString = expected.toString().replace(",", "\n");
    const buffer = Buffer.from(expectedString);
    child_process.execSync = jest.fn(() => buffer);

    const commitLog = new CommitLog();

    const actual = commitLog.getCommits();
    expect(actual).toEqual(expected);
  });
});
