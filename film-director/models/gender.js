import {DataTypes} from "sequelize";
import sequelize from "../database/mysql.js";

const Gender = sequelize.define("Gender", {
    name: DataTypes.STRING,
    description: DataTypes.STRING
   });
   
   export default Gender;