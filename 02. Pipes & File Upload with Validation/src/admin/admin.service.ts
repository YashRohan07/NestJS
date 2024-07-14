import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminUpdateDTO } from "./admin.dto";

@Injectable()
export class AdminService {
    getAdmin(): object {
        return { message: "Yes Admin" };
    }

    getAdminById(id: number): object {
        return { message: "Admin Id: " + id };
    }

    getAdminByName(name: string, id: number): object {
        return { "Name:": name, "ID: ": id };
    }

    getAllAdmin(myobj: object): object {
        return myobj;
    }

    addAdmin(adminDTO: AdminDTO): object {
        return { message: "Admin added successfully", admin: adminDTO };
    }

    updateAdmin(adminUpdateDTO: AdminUpdateDTO, id: number): object {
        return { message: "Admin updated successfully", updatedAdminId: id, body: adminUpdateDTO };
    }

    updateAdminInfo(id: number, adminUpdateDTO: AdminUpdateDTO): object {
        return { message: "Admin info updated successfully", updatedAdminId: id, body: adminUpdateDTO };
    }

    deleteAdmin(id: number): object {
        return { message: "Admin deleted successfully", deletedAdminId: id };
    }
}
