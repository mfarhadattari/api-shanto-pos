import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // searching functionality
  public search(searchableField: string[]) {
    const searchTerm = this.query?.searchTerm || '';
    this.modelQuery = this.modelQuery.find({
      $or: searchableField.map(
        (eachField: string) =>
          ({
            [eachField]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });
    return this;
  }

  // filtering functionality
  public filter() {
    const queryObject = { ...this.query };
    const excludeFields = ['sort', 'searchTerm', 'page', 'limit', 'fields'];
    excludeFields.forEach((field: string) => delete queryObject[field]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  // sorting functionality
  public sort() {
    const sort =
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // paginating functionality
  public paginate() {
    const page = Number(this.query?.page) | 1;
    const limit = Number(this.query?.limit) | 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip);
    return this;
  }

  // fields functionality
  public fields() {
    const fields = (this.query?.fields as string).split(',').join(' ') || '-v';
    this.modelQuery = this.modelQuery.select(fields);
    return this.modelQuery;
  }
}

export default QueryBuilder;
