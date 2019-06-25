import Commit from "./commit";

export default class CommitsFormatter {
  static format(commits: Array<Commit>): string {
    return this.formatCommits(commits);
  }

  private static formatCommits(commits: Array<Commit>): string {
    return commits.map((commit: Commit) => this.formatCommit(commit)).join("");
  }

  private static formatCommit(commit: Commit): string {
    return `- ${this.removeType(commit.getDetails())}\n`;
  }

  private static removeType(commit: string): string {
    return commit.replace(/^feat:\s|^fix:\s/, "");
  }
}
