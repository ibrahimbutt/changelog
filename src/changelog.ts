import ChangelogFormatter from "./formatters/changelogFormatter";
import Commit from "./commit";

export default class Changelog {
  private commits;
  private changelogFormatter;

  constructor(commits: Array<Commit>, ChangelogFormatter) {
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
