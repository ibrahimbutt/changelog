import Commit from "./commit";
import { execSync } from "child_process";

export default class CommitLog {
  private commits: Array<Commit>;

  constructor() {
    const log: string = this.getGitLog();
    this.commits = this.parseCommits(log);
  }

  public getCommits(): Array<Commit> {
    return this.commits;
  }

  private getGitLog(): string {
    const logBuffer: Buffer = this.execSync();
    return logBuffer.toString();
  }

  private execSync(): Buffer {
    return execSync(`git log --pretty=format:"%s %d %aD"`);
  }

  private parseCommits(log: string): Array<Commit> {
    let commits = log.split("\n");
    return commits.map(this.createCommit);
  }

  private createCommit(commit: string): Commit {
    return new Commit(commit);
  }
}
