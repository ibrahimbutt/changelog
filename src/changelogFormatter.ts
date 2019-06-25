import Commit from "./commit";
import SectionFormatter from "./sectionFormatter";

export default class ChangelogFormatter {
  private static SectionFormatter = SectionFormatter;

  static format(commits: Array<Commit>): string {
    var content = "";

    const versions = this.filterVersions(commits);

    for (let i = 0; i < versions.length; i++) {
      const featureCommits = this.getFeatureCommits(versions[i]);
      const fixCommits = this.getFixCommits(versions[i]);

      const addedSection: string = this.SectionFormatter.format(
        "Added",
        featureCommits
      );
      const fixedSection: string = this.SectionFormatter.format(
        "Fixed",
        fixCommits
      );

      const version = versions[i][0].getDetails().match(/v\d+\.\d+.\d+/);
      content +=
        "## " + version + "\n\n" + addedSection + "\n" + fixedSection + "\n";
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

  private static getFeatureCommits(commits): Array<Commit> {
    return commits.filter(commit => commit.getDetails().match(/^feat/));
  }

  private static getFixCommits(commits): Array<Commit> {
    return commits.filter(commit => commit.getDetails().match(/^fix/));
  }
}
