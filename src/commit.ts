export default class Commit {
  private details: string;

  constructor(details: string) {
    this.details = details;
  }

  public getDetails(): string {
    return this.details;
  }

  public getType(): string {
    const typeMatcherRegex = /^(\w+):/;
    return this.details.match(typeMatcherRegex)[1];
  }

  public getScope(): string {
    const scopeMatcherRegex = /^\w+\((\w+)\):/;
    return this.details.match(scopeMatcherRegex)[1];
  }

  public getDate(): string {
    const dateMatcherRegex = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun+),\s(\d+\s\w{3}\s\d{4}).+/;
    return this.details.match(dateMatcherRegex)[2];
  }
}
