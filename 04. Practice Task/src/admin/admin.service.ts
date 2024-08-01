import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity"; 
import { Repository } from "typeorm";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Dto, StatusDTO } from "./admin.dto";

@Injectable()
export class AdminService {

    constructor(@InjectRepository(AdminEntity) private readonly adminRepo: Repository<AdminEntity>) { }

    createUser(userdata: Dto): object {
        try {
            const usercreate = this.adminRepo.save(userdata); 
            return usercreate;
        } catch (error) {
            error.message;
        }
    }

    async updateStatus(id: number, statusdata: StatusDTO): Promise<AdminEntity> {
        try {
            const user = await this.adminRepo.findOne({ where: { id: id } });
            if (user) {
                const { status } = statusdata;
                user.status = status;

                const changestatus = this.adminRepo.save(user);
                return changestatus;
            } else {
                throw new NotFoundException(`${id} not found`)
            }
        } catch (error) {
            throw new ExceptionsHandler()
        }
    }

    getInactiveUser(): Promise<AdminEntity[]> {
        try {
            const inactiveuser = this.adminRepo.find({ where: { status: "inactive" } });
            return inactiveuser;
        } catch (error) {
            throw new ExceptionsHandler();
        }
    }

    getOlderUser(): Promise<AdminEntity[]> {
        try {
            const olderUser = this.adminRepo.createQueryBuilder('AdminEntity').where('AdminEntity.age >= 40').getMany(); 
            return olderUser;
        } catch (error) {
            error.message;
        }
    }
}
