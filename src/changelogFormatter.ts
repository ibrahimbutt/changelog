import Commit from "./commit";
import SectionFormatter from "./sectionFormatter";

export default class ChangelogFormatter {
  private static VersionFormatter = VersionFormatter;

  static format(commits: Array<Commit>): string {
    var content = "";

    const versions = this.filterVersions(commits);

    for (let i = 0; i < versions.length; i++) {
      content += this.VersionFormatter.format(versions[i]);
    }
    return content;
  }

  private static filterVersions(commits: Array<Commit>): Array<Commit> {
    const versionIndexes = [];

    commits.forEach((commit, index) => {
      if (commit.getDetails().includes("tag: v")) {
        versionIndexes.push(index);
      }
    });

    const numberOfVersions = versionIndexes.length;

    const versions = [];
    for (let i = 0; i < numberOfVersions; i++) {
      const versionCommits = commits.slice(
        versionIndexes[i],
        versionIndexes[i + 1]
      );
      versions.push(versionCommits);
    }

    return versions;
  }

  private static getFeatureCommits(commits: Array<Commit>): Array<Commit> {
    return commits.filter(commit => commit.getDetails().match(/^feat/));
  }

  private static getFixCommits(commits: Array<Commit>): Array<Commit> {
    return commits.filter(commit => commit.getDetails().match(/^fix/));
  }
}
