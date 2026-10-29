import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function NotInFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'notInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true; // Če vrednosti ni (opcijsko polje pri PATCH), je validacija uspešna

          const inputDate = new Date(value);
          const now = new Date();

          // Če je pretvorjen datum neveljaven (Invalid Date), vrne false
          if (isNaN(inputDate.getTime())) return false;

          // Datum mora biti manjši ali enak trenutnemu času
          return inputDate.getTime() <= now.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} ne sme biti datum v prihodnosti!`;
        },
      },
    });
  };
}