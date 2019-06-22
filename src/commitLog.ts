import Commit from "./commit";
import { execSync } from "child_process";

export default class CommitLog {
  private commits: Array<Commit>;

  constructor() {
    const logBuffer: Buffer = execSync(`git log --pretty=format:"%s %h"`);
    const logString: String = logBuffer.toString();
    this.commits = logString.split("\n").map(commit => new Commit(commit));
  }

  public getCommits(): Array<Commit> {
    return this.commits;
  }
}
