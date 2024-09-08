type RefreshTokenProps = {
  id: number;
  token: string;
  userId: number;
  createdAt: Date;
  expiresIn: Date;
}

export class RefreshToken {
  readonly id: number;
  token: string;
  userId: number;
  expiresIn: Date;

  constructor(props: RefreshTokenProps){
    Object.assign(this, props);
  }
}