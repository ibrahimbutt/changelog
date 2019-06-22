export default class ChangelogFormatter {
  static format(commits) {
    const featureCommits = this.getFeatureCommits(commits);
    const fixCommits = this.getFixCommits(commits);

    const addedSection: string = this.formatAddedSection(featureCommits);
    const fixedSection: string = this.formatFixedSection(fixCommits);

    return addedSection + "\n" + fixedSection;
  }

  private static getFeatureCommits(commits) {
    return commits.filter(commit => commit.getDetails().includes("feat"));
  }

  private static formatAddedSection(commits) {
    const header = "## Added\n\n";
    return this.formatSection(header, commits);
  }

  private static getFixCommits(commits) {
    return commits.filter(commit => commit.getDetails().includes("fix"));
  }

  private static formatFixedSection(commits) {
    const header = "## Fixed\n\n";
    return this.formatSection(header, commits);
  }

  private static formatSection(header, commits) {
    return header + this.formatCommits(commits);
  }

  private static formatCommits(commits) {
    let content = "";
    commits.forEach(commit => {
      content += this.formatCommit(commit);
    });
    return content;
  }
  private static formatCommit(commit) {
    return `- ${commit.getDetails()}\n`;
  }
}
