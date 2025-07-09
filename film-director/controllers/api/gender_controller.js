import Gender from "../../models/gender.js";
import Film from "../../models/film.js";

async function createGender(req,  res){ //req é a requisicao que chega 

    const gender = await Gender.create({
         name: req.body.name,
         description: req.body.description
    });

    res.json({mensage: 'Gender criado!'});
}

async function listGenders(req, res){
    const list = await Gender.findAll({include:[Film]});//lista completa
    res.json(list);
}

async function editGender(req, res){
    const gender = await Gender.findOne({where: {id: req.body.id}});//busca pelo id
    gender.name = req.body.name;//atualiza os dados
    gender.description = req.body.description;
    if(await gender.save()){//salva os dados e da uma resposta
        res.json({mensage: 'Gender alterado!'});
    }
    else {
        res.json({mensage: 'Erro ao alterar!'});
    }
    res.json(gender);

}

async function deleteGender(req, res){
    const gender = await Gender.findOne({where: {id: req.body.id}});//busca pelo id
    if(await gender.destroy()){//deleta e da uma resposta
        res.json({mensage: 'Gender removido!'});
    }
    else {
        res.json({mensage: 'Erro ao remover!'});
    }
}
export {createGender, listGenders, editGender, deleteGender};