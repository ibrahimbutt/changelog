export default class ActualCommitFormatter {
  static format(commits) {
    return {
      first: commits[0].getDetails(),
      second: commits[1].getDetails()
    };
  }
}
