// models/Task.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; // ✅ Use the same sequelize instance

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Task;
