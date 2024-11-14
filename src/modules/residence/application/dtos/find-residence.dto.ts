export class FindResidenceDto {
  cep: string;
  number: string;
  street: string;
}

export class FindResidenceWithBlockDto {
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