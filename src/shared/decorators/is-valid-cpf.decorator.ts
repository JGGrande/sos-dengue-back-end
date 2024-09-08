import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { isValidCPF } from '../utils/validations.utils';

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
        name: 'isValidCPF',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments): boolean {
            return isValidCPF(value);
          },
          defaultMessage(args: ValidationArguments): string {
            return `${args.property} must be a valid cpf`;
          },
        },
      });
  };
}