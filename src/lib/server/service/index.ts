import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';

export const userService = new UserService();
export const authService = new AuthService(userService);
export const productService = new ProductService();
