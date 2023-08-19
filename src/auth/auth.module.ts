import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/administrator/users/users.module';
import { ActivityLogsModule } from 'src/administrator/activity-logs/activity-logs.module';

@Module({
  imports: [
    UsersModule,
    ActivityLogsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
