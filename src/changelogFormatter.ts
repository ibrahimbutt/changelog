import Commit from "./commit";

export default class ChangelogFormatter {
  static format(commits: Array<Commit>): string {
    const featureCommits = this.getFeatureCommits(commits);
    const fixCommits = this.getFixCommits(commits);

    const addedSection: string = this.formatAddedSection(featureCommits);
    const fixedSection: string = this.formatFixedSection(fixCommits);

    return addedSection + "\n" + fixedSection;
  }

  private static getFeatureCommits(commits): Array<Commit> {
    return commits.filter(commit => commit.getDetails().includes("feat"));
  }

  private static formatAddedSection(commits): string {
    const header = "## Added\n\n";
    return this.formatSection(header, commits);
  }

  private static getFixCommits(commits): Array<Commit> {
    return commits.filter(commit => commit.getDetails().includes("fix"));
  }

  private static formatFixedSection(commits): string {
    const header = "## Fixed\n\n";
    return this.formatSection(header, commits);
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
