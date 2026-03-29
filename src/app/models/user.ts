export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAuthenticated: boolean;
  wishlistIds: string[];
}
