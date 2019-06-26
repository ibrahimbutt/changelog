import Commit from "../commit";

export default class CommitsFormatter {
  static format(commits: Array<Commit>): string {
    return this.formatCommits(commits);
  }

  private static formatCommits(commits: Array<Commit>): string {
    return commits.map((commit: Commit) => this.formatCommit(commit)).join("");
  }

  private static formatCommit(commit: Commit): string {
    const scope: string | false = this.getScope(commit);

    return `- ${scope ? `*${scope}*: ` : ""}${this.removeType(
      commit.getDetails()
    )}\n`;
  }

  private static removeType(commit: string): string {
    return commit.replace(/^feat\(*\w*\)*:\s|^fix\(*\w*\)*:\s/, "");
  }

  private static getScope(commit: Commit): string | false {
    const scope = commit.getDetails().match(/^\w+\((\w+)\)/);
    return scope !== null ? scope[1] : false;
  }
}
