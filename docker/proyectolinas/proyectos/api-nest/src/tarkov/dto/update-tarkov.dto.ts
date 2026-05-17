import { PartialType } from '@nestjs/mapped-types';
import { CreateTarkovDto } from './create-tarkov.dto';

export class UpdateTarkovDto extends PartialType(CreateTarkovDto) {}
