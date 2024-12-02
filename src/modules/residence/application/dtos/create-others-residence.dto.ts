import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateOthersResidenceRequestDto {
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

  @IsString({ message: 'Número da residência informado inválido.' })
  number: string;

  @IsString({ message: 'Bairro informado inválido.' })
  neighborhood: string;

  @IsString({ message: 'Quadra informada inválida.' })
  streetCourt: string;

  @IsString({ message: 'Complemento informado inválido.' })
  complement: string;

  @IsOptional()
  @IsString({ message: 'Bloco informado inválido.' })
  block: string | null;
}