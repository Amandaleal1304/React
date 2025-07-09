import Director from "../../models/director.js";                        
import Film from "../../models/film.js";

async function createDirector(req,  res){ //req é a requisicao que chega 

    const director = await Director.create({
        name: req.body.name,
         age: req.body.age,
         telephone: req.body.telephone,
    });
    res.json(director);
}

async function listDirectors(req, res){
    const list = await Director.findAll({include:[Film]});//lista completa
    res.json(list);
}

async function editDirector(req, res){
    const director = await Director.findOne({where: {id: req.body.id}});//busca pelo id
    director.name = req.body.name;//atualiza os dados
    director.age = req.body.age;
    director.telephone = req.body.telephone;
    if(await director.save()){//salva os dados e da uma resposta
        res.json({mensage: 'Diretor alterado!'});
    }
    else {
        res.json({mensage: 'Erro ao alterar!'});
    }
    res.json(director);

}

async function deleteDirector(req, res){
    const director = await Director.findOne({where: {id: req.body.id}});//busca pelo id
    if(await director.destroy()){//deleta e da uma resposta
        res.json({mensage: 'Diretor removido!'});
    }
    else {
        res.json({mensage: 'Erro ao remover!'});
    }
}
export {createDirector, listDirectors, editDirector, deleteDirector};