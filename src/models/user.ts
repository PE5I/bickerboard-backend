import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';

class User extends Model {
  public id!: number;
  public handle!: string;
  public email!: string;
  public passwordHash!: string;
  public isAdmin!: boolean;
  public isEnabled!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: ['^[a-z0-9]+$', 'i'],
        msg: 'Username must be alphanumeric'
      },
      max: {
        args: [19],
        msg: 'Username can only be 20 characters'
      },
      min: {
        args: [4],
        msg: 'Username must be at least 4 characters'
      }
    }
  },
  email: {
    type: DataTypes.STRING(320),
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
});

export default User;