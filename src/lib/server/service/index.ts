import { AuthService } from './auth.service';
import { CookiesService } from './cookies.service';
import { ProductService } from './product.service';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';

export const cookiesService = new CookiesService();
export const userService = new UserService();
export const authService = new AuthService(userService, cookiesService);
export const productService = new ProductService();
export const transactionService = new TransactionService(productService);
