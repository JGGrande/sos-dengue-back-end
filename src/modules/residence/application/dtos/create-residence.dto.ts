import { IsEnum, IsLatitude, IsLongitude, IsNumber, IsOptional, IsString } from 'class-validator';
import { ResidenceTypeEnum } from '../../domain/enums/residence.enum';

export class CreateResidenceDto {
  @IsString()
  @IsEnum(ResidenceTypeEnum)
  type: string;

  @IsString()
  cep: string;

  @IsNumber()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  number: string | null;

  @IsString()
  neighborhood: string;

  @IsOptional()
  @IsString()
  streetCourt: string | null;

  @IsOptional()
  @IsString()
  block: string | null;

  @IsOptional()
  @IsString()
  complement: string | null;

  @IsOptional()
  @IsString()
  apartmentNumber: string | null;
}