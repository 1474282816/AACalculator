export type DBType<T> = {
  _id: string;
  _rev: string;
  data: T;
};
