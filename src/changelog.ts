import ChangelogFormatter from "./formatters/changelogFormatter";

export default class Changelog {
  private commits;
  private changelogFormatter;

  constructor(commits, ChangelogFormatter) {
    this.commits = commits;
    this.changelogFormatter = ChangelogFormatter;
  }

  public content() {
    return this.format(this.commits);
  }

  private format(commits) {
    return this.changelogFormatter.format(commits);
  }
}
