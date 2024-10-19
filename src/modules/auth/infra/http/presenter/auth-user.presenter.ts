import { User } from "src/modules/user/domain/entities/user.entity";

type ToHttpResponseParams = {
  user: User | null;
  token: string;
  refreshToken: string;
}

export class AuthUserPresenter {
  static toHttpResponse({ user, token, refreshToken }: ToHttpResponseParams) {
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      refreshToken
    }
  }
}