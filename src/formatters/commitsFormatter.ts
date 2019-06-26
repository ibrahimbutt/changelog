import Commit from "../commit";

export default class CommitsFormatter {
  static format(commits: Array<Commit>): string {
    return this.formatCommits(commits);
  }

  private static formatCommits(commits: Array<Commit>): string {
    return commits.map((commit: Commit) => this.formatCommit(commit)).join("");
  }

  private static formatCommit(commit: Commit): string {
    const scope: string | false = commit.getScope(commit);
    const cleanedSubject: string = this.removeTypeAndDate(commit);

    return `- ${scope ? `**${scope}**: ` : ""}${cleanedSubject}\n`;
  }

  private static removeTypeAndDate(commit: Commit): string {
    return commit
      .getDetails()
      .replace(/^feat\(*\w*\)*:\s|^fix\(*\w*\)*:\s/, "")
      .replace(" " + commit.getDate(), "");
  }

  private static removeDate(commit: Commit) {
    return commit.getDetails().replace(commit.getDate(), "");
  }
}
