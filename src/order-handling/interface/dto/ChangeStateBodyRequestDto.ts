import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ChangeStateBodyRequestDto {
  @IsNotEmpty({ message: 'el id no debe ser vacio' })
  @IsUUID('all', { message: 'version uuid no soportado' })
  readonly id: string;
  readonly name: string;
  @IsNotEmpty({ message: 'Debe contener un tipo' })
  @IsString({ message: 'Debe ser caracteres' })
  readonly type: string;
  @IsNotEmpty({ message: 'Debe contener un estado nuevo' })
  readonly statusId: string;
}
