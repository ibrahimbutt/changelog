export default class Commit {
  private details: string;

  constructor(details: string) {
    this.details = details;
  }

  public getDetails(): string {
    return this.details;
  }
}
