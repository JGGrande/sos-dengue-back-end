type UserProps = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User {
  readonly id: number;
  name: string;
  cpf: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.cpf = props.cpf;
    this.email = props.email;
    this.photo = props.photo;
    this.role = props.role;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

}
