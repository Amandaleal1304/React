import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

// id e datas de criacao e alteracao sao automaticas
const Film = sequelize.define("Film", {
 title: DataTypes.STRING,
 description: DataTypes.STRING,
 year: DataTypes.INTEGER,
});

export default Film;