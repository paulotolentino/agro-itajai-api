import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
