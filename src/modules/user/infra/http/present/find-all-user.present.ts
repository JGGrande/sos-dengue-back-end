import { User } from "src/modules/user/domain/entities/user.entity";

export class FindAllUserPresent {
    static toHttpApp(users: User[]) {
        return users.map(user => {
            const { password, deletedAt, ...userWithoutPasswordAndDeletedAt } = user;
            return userWithoutPasswordAndDeletedAt;
        });
    }
}