export default class Commit {
  private details: String;

  constructor(details: String) {
    this.details = details;
  }

  public getDetails(): String {
    return this.details;
  }
}
