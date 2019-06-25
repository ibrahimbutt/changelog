import Commit from "./commit";

export default class ChangelogFormatter {
  static format(commits: Array<Commit>): string {
    var content = "";

    const versions = this.filterVersions(commits);

    for (let i = 0; i < versions.length; i++) {
      const featureCommits = this.getFeatureCommits(versions[i]);
      const fixCommits = this.getFixCommits(versions[i]);

      const addedSection: string = this.formatAddedSection(featureCommits);
      const fixedSection: string = this.formatFixedSection(fixCommits);

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

  private static formatAddedSection(commits): string {
    return this.formatSection("### Added\n\n", commits);
  }

  private static getFixCommits(commits): Array<Commit> {
    return commits.filter(commit => commit.getDetails().match(/^fix/));
  }

  private static formatFixedSection(commits): string {
    return this.formatSection("### Fixed\n\n", commits);
  }

  private static formatSection(header, commits): string {
    return header + this.formatCommits(commits);
  }

  private static formatCommits(commits): string {
    let content = "";
    commits.forEach(commit => {
      content += this.formatCommit(commit);
    });
    return content;
  }
  private static formatCommit(commit): string {
    return `- ${commit.getDetails()}\n`;
  }
}
