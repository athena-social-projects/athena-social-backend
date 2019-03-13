export default abstract class Client {
  protected uri: string;
  protected searchPath: string;
  protected type: string;

  constructor(uri: string, searchPath: string) {
    this.uri = uri;
    this.searchPath = searchPath;
  }

  // abstract getById(): any;

  abstract searchByString(search: string): any;
}
