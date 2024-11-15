export class FindHouseResidenceDto {
  cep: string;
  number: string;
  street: string;
}

export class FindHouseResidenceWithBlockDto {
  cep: string;
  number: string;
  street: string;
  block: string;
}

export class FindAllResidenceByCoordinatesDto {
  lat: number;
  lng: number;
  distanceInDegrees: number;
}