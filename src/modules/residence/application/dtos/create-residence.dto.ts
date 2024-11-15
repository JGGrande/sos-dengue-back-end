import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateResidenceDto {
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
}

export class CreateHouseResidenceRequestDto {
  @IsString({ message: 'CEP informado inválido.' })
  @Length(8, 8, { message: 'CEP deve ter 8 caracteres.' })
  cep: string;

  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @IsLatitude({ message: 'Latitude inválida' })
  lat: number;

  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @IsLongitude({ message: 'Longitude inválida' })
  lng: number;

  @IsString({ message: 'Rua informada inválida.' })
  street: string;

  @IsString({ message: 'Número da casa informado inválido.' })
  number: string;

  @IsString({ message: 'Bairro informado inválido.' })
  neighborhood: string;

  @IsString({ message: 'Quadra informada inválida.' })
  streetCourt: string;

  @IsOptional()
  @IsString({ message: 'Bloco informado inválido.' })
  block: string | null;

  @IsOptional()
  @IsString({ message: 'Complemento informado inválido.' })
  complement: string | null;
}