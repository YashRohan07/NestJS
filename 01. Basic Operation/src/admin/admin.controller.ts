import { Body, Controller, Get, Param, Post, Put, Delete, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getAdmin(): object {
        return this.adminService.getAdmin();
    }

    @Get('getById/:id')
    getAdminById(@Param('id') id: number): object {
        return this.adminService.getAdminById(id);
    }

    @Get('getByNameAndId')
    getAdminNameId(@Query('name') name: string, @Query('id') id: number): object {
        return this.adminService.getAdminByName(name, id);
    }

    @Post('getalladmin')
    getAllAdmin(@Body() myobj: object): object {
        console.log(myobj);
        return this.adminService.getAllAdmin(myobj);
    }

    @Post('addadmin')
    addAdmin(@Body() myobj: object): object {
        return this.adminService.addAdmin(myobj);
    }
    
    @Put('updateadmin/:id')
    updateAdmin(@Param('id') id: number, @Body() myobj: object): object {
        return this.adminService.updateAdmin(myobj, id);
    }

    @Delete('deleteadmin/:id')
    deleteAdmin(@Param('id') id: number, @Body() myobj: object): object {
        return this.adminService.deleteAdmin(myobj, id);
    }
}
