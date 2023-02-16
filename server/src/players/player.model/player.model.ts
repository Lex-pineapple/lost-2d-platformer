import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export class PlayerCreationAttrs {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'players' })
export class PlayerModel extends Model<PlayerModel, PlayerCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: string;

  @ApiProperty({ example: 'Player 1', description: 'Player name' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @ApiProperty({ example: 'email@site.com', description: 'Unique email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @ApiProperty({ example: '0', description: 'Player score, default – 0' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  score: number;

  @ApiProperty({ example: '3', description: 'Lives left, default – 3' })
  @Column({ type: DataType.INTEGER, defaultValue: 3 })
  livesLeft: number;

  @ApiProperty({ example: '1', description: 'Last level, default – 1' })
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  lastLevel: number;
}
