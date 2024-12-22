import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule to load .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make the config globally available
      envFilePath: '.env', // Load environment variables from .env file
    }),

    // TypeOrmModule configuration using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule so we can inject ConfigService
      inject: [ConfigService], // Inject ConfigService to access the environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'fahad'),
        password: configService.get<string>('DATABASE_PASSWORD', 'Realmadridc.f631902'),
        database: configService.get<string>('DATABASE_NAME', 'anuedb'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
      }),
    }),

    TasksModule, // Import TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
