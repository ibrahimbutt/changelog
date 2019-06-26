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
    const commitWithoutType: string = this.removeType(commit);

    return `- ${scope ? `*${scope}*: ` : ""}${commitWithoutType}\n`;
  }

  private static removeType(commit: Commit): string {
    return commit
      .getDetails()
      .replace(/^feat\(*\w*\)*:\s|^fix\(*\w*\)*:\s/, "");
  }

  private static getScope(commit: Commit): string | false {
    const scope = commit.getDetails().match(/^\w+\((\w+)\)/);
    return scope !== null ? scope[1] : false;
  }
}
