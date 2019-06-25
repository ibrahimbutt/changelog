import SectionFormatter from "../src/sectionFormatter";
import Commit from "../src/commit";

export default class VersionFormatter {
  private static SectionFormatter = SectionFormatter;

  static format(commits: Array<Commit>): string {
    const version: string = this.getVersion(commits);
    const sections: Array<Array<Commit>> = this.getSections(commits);

    return this.formatVersion(version, sections);
  }

  private static formatVersion(
    version: string,
    sections: Array<Array<Commit>>
  ): string {
    const formattedSections: string = this.formatSections(sections);

    return "## " + version + "\n\n" + formattedSections;
  }

  private static getVersion(commits: Array<Commit>): string {
    return commits[0].getDetails().match(/v\d+\.\d+.\d+/)[0];
  }

  private static getSections(commits: Array<Commit>): Array<Array<Commit>> {
    const featureCommits: Array<Commit> = this.getFeatureCommits(commits);
    const fixCommits: Array<Commit> = this.getFixCommits(commits);

    return [featureCommits, fixCommits];
  }

  private static getFeatureCommits(commits: Array<Commit>): Array<Commit> {
    return commits.filter((commit: Commit) =>
      commit.getDetails().match(/^feat/)
    );
  }

  private static getFixCommits(commits: Array<Commit>): Array<Commit> {
    return commits.filter((commit: Commit) =>
      commit.getDetails().match(/^fix/)
    );
  }

  private static formatSections(sections: Array<Array<Commit>>): string {
    const addedSection: string = this.formatSection("Added", sections[0]);
    const fixedSection: string = this.formatSection("Fixed", sections[1]);

    return addedSection + "\n" + fixedSection + "\n";
  }

  private static formatSection(header: string, commits: Array<Commit>): string {
    return this.SectionFormatter.format(header, commits);
  }
}
