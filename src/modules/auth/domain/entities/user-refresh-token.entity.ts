type UserRefreshTokenProps = {
  id: number;
  token: string;
  userId: number;
  createdAt: Date;
  expiresIn: Date;
}

export class UserRefreshToken {
  readonly id: number;
  token: string;
  userId: number;
  expiresIn: Date;
  createdAt: Date;

  constructor(props: UserRefreshTokenProps){
    Object.assign(this, props);
  }
}