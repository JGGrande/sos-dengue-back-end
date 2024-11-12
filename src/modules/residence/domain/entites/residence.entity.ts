type ResidenceProps = {
  id: number;
  type: string;
  cep: string;
  lat: number;
  lng: number;
  street: string;
  number: string | null;
  neighborhood: string;
  streetCourt: string | null;
  block: string | null;
  complement: string | null;
  apartmentNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Residence {
  readonly id: number;
  type: string;
  cep: string;
  lat: number;
  lng: number;
  street: string;
  number: string | null;
  neighborhood: string;
  streetCourt: string | null;
  block: string | null;
  complement: string | null;
  apartmentNumber: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ResidenceProps){
    Object.assign(this, props);
  }

}