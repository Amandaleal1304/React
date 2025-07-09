import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'projeto_node'
});

// const sequelize = new Sequelize('postgresql://pratica_filmes_user:bnNBIAUNtv13028aiyBKE90SPqtmeWDS@dpg-d1dva8qdbo4c73ec036g-a/film_7iyy');


export default sequelize;