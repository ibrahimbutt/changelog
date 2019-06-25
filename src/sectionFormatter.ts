import CommitsFormatter from "./commitsFormatter";
import Commit from "./commit";

export default class SectionFormatter {
  private static CommitsFormatter = CommitsFormatter;

  static format(header, commits: Array<Commit>) {
    return `### ${header}\n\n${this.formatCommits(commits)}`;
  }

  private static formatCommits(commits: Array<Commit>): string {
    return this.CommitsFormatter.format(commits);
  }
}
