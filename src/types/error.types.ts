export interface MySQL2Error extends Error {
  code?: string;
  errno?: number;
  sqlState?: string;
  sqlMessage?: string;
}
