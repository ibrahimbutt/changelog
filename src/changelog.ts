import { throwStatement } from "@babel/types";

export default class Changelog {
  private commits;
  constructor(commits) {
    this.commits = commits;
  }

  public content() {
    return this.format(this.commits);
  }

  private format(commits) {
    const featureCommits = this.getFeatureCommits(commits);
    const fixCommits = this.getFixCommits(commits);

    const addedSection: string = this.formatAddedSection(featureCommits);
    const fixedSection: string = this.formatFixedSection(fixCommits);

    return addedSection + "\n" + fixedSection;
  }

  private getFeatureCommits(commits) {
    return commits.filter(commit => commit.getDetails().includes("feat"));
  }

  private formatAddedSection(commits) {
    const header = "## Added\n\n";
    return this.formatSection(header, commits);
  }

  private getFixCommits(commits) {
    return commits.filter(commit => commit.getDetails().includes("fix"));
  }

  private formatFixedSection(commits) {
    const header = "## Fixed\n\n";
    return this.formatSection(header, commits);
  }

  private formatSection(header, commits) {
    return header + this.formatCommits(commits);
  }

  private formatCommits(commits) {
    let content = "";
    commits.forEach(commit => {
      content += this.formatCommit(commit);
    });
    return content;
  }
  private formatCommit(commit) {
    return `- ${commit.getDetails()}\n`;
  }
}
