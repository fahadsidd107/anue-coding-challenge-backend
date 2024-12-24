import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DB_URL');
        
        // Log the URL (remove in production)
        console.log('Database URL:', databaseUrl);

        return {
          type: 'postgres',
          url: databaseUrl,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          ssl: {
            rejectUnauthorized: false
          },
          extra: {
            // Add connection timeout
            connectionTimeoutMillis: 5000
          },
          // Add logging to see what's happening
          logging: true
        };
      },
    }),

    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}