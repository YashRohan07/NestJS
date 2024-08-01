import { Body, Controller, UsePipes, ValidationPipe, Post, Patch, Param, Get } from "@nestjs/common";
import { AdminService } from "./admin.service"; 
import { AdminEntity } from "./admin.entity"; 
import { Dto, StatusDTO } from "./admin.dto";

@Controller('user')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userdata: Dto): object {
        return this.adminService.createUser(userdata); 
    }

    @Patch('updatestatus/:userid')
    @UsePipes(new ValidationPipe())
    updateStatus(@Param('userid') userid: number, @Body() statusdata: StatusDTO): Promise<AdminEntity> {
        return this.adminService.updateStatus(userid, statusdata); 
    }

    @Get('inactive')
    getInactiveUser(): Promise<AdminEntity[]> {
        return this.adminService.getInactiveUser(); 
    }

    @Get('older')
    getOlderUser(): Promise<AdminEntity[]> {
        return this.adminService.getOlderUser(); 
    }
}
