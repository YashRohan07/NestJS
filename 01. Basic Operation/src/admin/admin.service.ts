import { Injectable } from "@nestjs/common";

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

    addAdmin(myobj: object): object {
        return { message: "Admin added successfully", admin: myobj };
    }

    updateAdmin(myobj: object, id: number): object {
        return { message: "Admin updated successfully", updatedAdminId: id, body: myobj };
    }

    deleteAdmin(myobj: object, id: number):object {
        return { message: "Admin deleted successfully", deletedAdminId: id, body: myobj};
    }
}
