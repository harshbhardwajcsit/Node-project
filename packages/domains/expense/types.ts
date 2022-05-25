import { Model, DataTypes } from "sequelize";
import sequelize from "@nc/utils/db";
export class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    merchant_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount_in_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "expenses",
    timestamps: false,
  }
);
