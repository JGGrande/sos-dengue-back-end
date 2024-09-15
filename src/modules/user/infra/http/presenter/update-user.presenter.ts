import { User } from "src/modules/user/domain/entities/user.entity";

export class UpdateUserPresent{
  static toHttpResponse(user: User){
    const { password, deletedAt,  ...userWithoutPasswordAndDeletedAt } = user;

    return userWithoutPasswordAndDeletedAt;
  }
}