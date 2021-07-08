import { IsNotEmpty, IsUUID } from 'class-validator';

export class TableBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  @IsNotEmpty({ message: 'Debe contener un nombre' })
  readonly name: string;
}
