import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',  //dest option specifies the directory (./uploads) where the uploaded files will be stored.
        }),
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
