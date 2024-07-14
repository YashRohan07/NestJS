import { Body, Controller, Get, Param, Post, Put, Delete, Query, ValidationPipe, UsePipes, Patch, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

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
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() myobj: AdminDTO): object {
        return this.adminService.addAdmin(myobj);
    }

    @Put('updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdmin(@Body() myobj: AdminUpdateDTO, @Param('id') id: number): object {
        return this.adminService.updateAdmin(myobj, id);
    }

    @Patch('updateadmininfo/:id')
    @UsePipes(new ValidationPipe())
    updateAdminInfo(@Param('id') id: number, @Body() myobj: AdminUpdateDTO): object {
        return this.adminService.updateAdminInfo(id, myobj);
    }

    @Delete('deleteadmin/:id')
    deleteAdmin(@Param('id') id: number): object {
        return this.adminService.deleteAdmin(id);
    }

    @Post('addimage')
    @UseInterceptors(FileInterceptor('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                cb(null, true);
            } else {
                cb(new Error('Unsupported file type'), false);
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    }))
    addImage(@UploadedFile() file: Express.Multer.File): string {
        return file.filename; // Return filename to save in database or use later
    }

    @Get('/getimage/:name')
    getImage(@Param('name') filename: string, @Res() res): void {
        res.sendFile(filename, { root: './uploads' });
    }
}
