import Commit from "./commit";
import { execSync } from "child_process";

export default class CommitLog {
  private commits: Array<Commit>;

  constructor() {
    const log: String = this.getGitLog();
    this.commits = this.parseCommits(log);
  }

  public getCommits(): Array<Commit> {
    return this.commits;
  }

  private getGitLog(): String {
    const logBuffer: Buffer = this.execSync();
    return logBuffer.toString();
  }

  private execSync(): Buffer {
    return execSync(`git log --pretty=format:"%s %h %d"`);
  }

  private parseCommits(log: String): Array<Commit> {
    const commits = log.split("\n");
    return commits.map(this.createCommit);
  }

  private createCommit(commit: String): Commit {
    return new Commit(commit);
  }
}
