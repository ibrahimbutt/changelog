import { execSync } from "child_process";

export class CommitLog {
  private commits: Array<any>;

  constructor() {
    const logBuffer = execSync(`git log --pretty=format:"%s %h"`);
    const logString = logBuffer.toString();
    this.commits = logString.split("\n");
  }

  public getCommits(): Array<any> {
    return this.commits;
  }
}
