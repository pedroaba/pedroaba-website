export class QueryBuilder {
  static client() {
    return {
      list: (name: string) => ['clients', name],
    }
  }
}
