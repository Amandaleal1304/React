import sequelize from "./mysql.js";
import Film from "../models/film.js";
import Director from "../models/director.js";
import Gender from "../models/gender.js";

async function syncer(){
    try{
    await sequelize.authenticate();
    Film.belongsTo(Director);//cria a chave estrangeira - belongsTo(pertence) (1:1)
    Director.hasMany(Film);//cria a chave estrangeira - hasMany(tem muitos) (1:N)

    //varios filmes podem ter varios generos
    Film.belongsToMany(Gender, { through: 'Film_Gender'});//cria a chave estrangeira - belongsTo(pertence) (1:1)
    Gender.belongsToMany(Film, { through: 'Film_Gender'});//cria a chave estrangeira - hasMany(tem muitos) (1:N)
    await sequelize.sync();
    }
    catch(error){
        console.log('Erro ao acessar a base de dados.');
        console.log(error);
        return false;

    }
    return true;
}

export default syncer;