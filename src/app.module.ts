import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { RewiewModule } from './rewiew/rewiew.module';
import { PaginationModule } from './pagination/pagination.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { SendmailModule } from './sendmail/sendmail.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CategoryModule, ProductModule, RewiewModule, PaginationModule, OrderModule, UserModule, CartModule, SendmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
