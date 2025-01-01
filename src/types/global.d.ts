export interface AuthorizedRequest {
  user?: {
    username: string;
    id: number;
  };
  storeId?: number;
}
