export interface Book {
  id?: string;
  title: string;
  author: string;
  publishedYear: number;
  genres: string[];
  stock: number;
}

export interface QueryParams {
  page: number;
  limit: number;
  search?: string | null;
}
