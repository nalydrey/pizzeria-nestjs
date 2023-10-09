import { ConfigService } from "@nestjs/config";
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const getDataBaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('BASE_HOST'),
    port: +configService.get('BASE_PORT'),
    username: configService.get('BASE_USER_NAME'),
    password: configService.get('BASE_PASSWORD'),
    database: configService.get('BASE_NAME'),
    synchronize: true,
    autoLoadEntities: true   
  })