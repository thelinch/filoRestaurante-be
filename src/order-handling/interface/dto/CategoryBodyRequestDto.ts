import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CategoryBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  @IsNotEmpty({ message: 'Debe contener un nombre' })
  @IsString({ message: 'Debe ser caracteres' })
  readonly name: string;
  @IsNotEmpty({ message: 'Debe contener un dato' })
  @IsBoolean({ message: 'El dato debe ser booleano' })
  readonly isVisible: boolean;
}
