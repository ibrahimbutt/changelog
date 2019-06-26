import Commit from "./commit";

export default class Changelog {
  private commits: Array<Commit>;
  private changelogFormatter: any;

  constructor(commits: Array<Commit>, ChangelogFormatter: any) {
    this.commits = commits;
    this.changelogFormatter = ChangelogFormatter;
  }

  public content(): string {
    return this.format(this.commits);
  }

  private format(commits: Array<Commit>): string {
    return this.changelogFormatter.format(commits);
  }
}
