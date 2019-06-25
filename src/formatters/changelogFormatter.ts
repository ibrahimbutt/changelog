import Commit from "../commit";
import VersionFormatter from "./versionFormatter";

export default class ChangelogFormatter {
  private static VersionFormatter = VersionFormatter;

  static format(commits: Array<Commit>): string {
    const versions: Array<Array<Commit>> = this.filterVersions(commits);

    return this.formatVersions(versions);
  }

  private static filterVersions(commits: Array<Commit>): Array<Array<Commit>> {
    const versionIndexes: Array<number> = this.getVersionIndices(commits);
    const numberOfVersions: number = versionIndexes.length;

    const versions: Array<Array<Commit>> = [];
    for (let i = 0; i < numberOfVersions; i++) {
      const versionCommits = this.getVersionCommits(commits, {
        start: versionIndexes[i],
        end: versionIndexes[i + 1]
      });
      versions.push(versionCommits);
    }

    return versions;
  }

  private static getVersionCommits(
    commits: Array<Commit>,
    versionLocation: any
  ) {
    return commits.slice(versionLocation.start, versionLocation.end);
  }

  private static formatVersions(versions: Array<Array<Commit>>) {
    return versions.reduce((content, version) => {
      return (content += this.formatVersion(version));
    }, "");
  }

  private static formatVersion(version: Array<Commit>) {
    return this.VersionFormatter.format(version);
  }

  private static getVersionIndices(commits: Array<Commit>) {
    const versionIndexes: Array<number> = [];

    commits.forEach((commit, index) => {
      if (commit.getDetails().includes("tag: v")) {
        versionIndexes.push(index);
      }
    });

    return versionIndexes;
  }
}
