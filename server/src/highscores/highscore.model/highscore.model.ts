import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PlayerModel } from '../../players/player.model/player.model';

export class HighscoreCreationAttrs {
  highscore: number;
  playerId: number;
}

@Table({ tableName: 'highscores' })
export class HighscoreModel extends Model<HighscoreModel, HighscoreCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '500', description: 'Player win score' })
  @Column({ type: DataType.INTEGER })
  highscore: number;

  @ForeignKey(() => PlayerModel)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  playerId: number;

  @BelongsTo(() => PlayerModel)
  player: PlayerModel;
}
