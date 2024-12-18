import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BrandsModule } from './brands/brands.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { CustomersModule } from './customers/customers.module';
import { CashInModule } from './cash-in/cash-in.module';
import { CashOutModule } from './cash-out/cash-out.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductPriceHistoryModule } from './product-price-history/product-price-history.module';
import { StockEntriesModule } from './stock-entries/stock-entries.module';
import { CashBalanceModule } from './cash-balance/cash-balance.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { DebitPaymentModule } from './debit-payment/debit-payment.module';
import secretsConfig from './secretsConfig';

const jwtConfig = secretsConfig().jwt;
@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
      global: true,
    }),
    BrandsModule,
    PaymentTypeModule,
    CustomersModule,
    CashInModule,
    CashOutModule,
    ProductsModule,
    CategoriesModule,
    ProductPriceHistoryModule,
    StockEntriesModule,
    CashBalanceModule,
    OrderModule,
    OrderItemModule,
    DebitPaymentModule,
  ],
})
export class AppModule {}
