import { User } from "src/modules/user/domain/entities/user.entity";

export class CreateUserPresent{
    static toHttpApp(user: User){
        const { password, deletedAt,  ...userWithoutPasswordAndDeletedAt } = user;

        return userWithoutPasswordAndDeletedAt;
    }
}