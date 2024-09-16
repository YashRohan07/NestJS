import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AdminController } from './admin.controller'; 
import { AdminService } from './admin.service';
import { Admin } from './admin.entity'; 
import { AuthModule } from '../auth/auth.module'; 
import { EventModule } from '../events/event.module'; 
import { VolunteerModule } from '../volunteers/volunteer.module'; 
import { EventManagerModule } from '../event-manager/event-manager.module'; 
import { SponsorModule } from '../sponsors/sponsor.module';  
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),

    // Configure Multer for file uploads
    MulterModule.register({
      dest: './uploads', // Defines the destination directory for uploaded files
    }),
    
    // Configure MailerModule for sending emails using async configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get<string>('EMAIL_USER'), // Use ConfigService to get environment variables
            pass: configService.get<string>('EMAIL_PASS'),
          },
          debug: true,
        },
      }),
    }),

    // Import other modules to access their services
    AuthModule,
    EventModule,
    VolunteerModule,
    EventManagerModule,
    SponsorModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
