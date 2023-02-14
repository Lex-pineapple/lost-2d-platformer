import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PatchPlayerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  livesLeft?: number;

  @IsOptional()
  @IsNumber()
  lastLevel?: number;
}
