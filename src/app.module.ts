import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { LibrosModule } from './libros/libros.module';


@Module({
  imports: [UsersModule, CategoriesModule,ProductsModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tienditachida',
    synchronize: true,
    autoLoadEntities:true,
  }), BooksModule, LibrosModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}





