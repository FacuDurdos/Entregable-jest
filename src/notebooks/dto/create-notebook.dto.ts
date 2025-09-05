// create-notebook.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotebookDto {
  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  problema: string;
}
