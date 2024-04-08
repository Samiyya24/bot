import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationAttr {
    id: string;
    otp: string;
    expiration_time: Date;
    varified: boolean;
    check: string; // phone
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, IOtpCreationAttr> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  otp: string;

  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  varified: boolean;

  @Column({
    type: DataType.STRING,
  })
  check: string; // phone
}