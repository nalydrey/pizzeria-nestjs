import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataBaseConfig } from './configs/MySQL.config';
import { PizzaModule } from './pizza/pizza.module';
import { IngridientModule } from './ingridient/ingridient.module';
import { PictureModule } from './picture/picture.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';




@Module({
  imports: [
    PictureModule,
    IngridientModule,
    PizzaModule,
    ConfigModule.forRoot(),   
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDataBaseConfig
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    })
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  



