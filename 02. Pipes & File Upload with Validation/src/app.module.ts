// src/app.module.ts
import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";

@Module({
    imports: [AdminModule],
})
export class AppModule {}
