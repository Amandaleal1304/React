import Film from "../../models/film.js";
import Gender from "../../models/gender.js";
import Director from "../../models/director.js";

async function createFilm(req,  res){ //req é a requisicao que chega 
    console.log(req.body);                                                                                      

    const genders = [];//vetor de id de genders
    for(let i = 0; i < req.body.genders.length; i++){
       const gender = await Gender.findByPk( req.body.genders[i]);//busca pelo id
       genders.push(gender);//adiciona ao vetor
        
    }
    const film = await Film.create({
        title: req.body.title,
         description: req.body.description,
         year: req.body.year,
         DirectorId: req.body.DirectorId               
    });

    await film.addGenders(genders);//adiciona os genders
    res.json(film);
}

async function listFilms(req, res){
    const list = await Film.findAll({include:[Gender, Director]});//lista completa
    res.json(list);
}

async function editFilm(req, res){
    const film = await Film.findOne({where: {id: req.body.id}});//busca pelo id
    film.title = req.body.title;//atualiza os dados
    film.description = req.body.description;
    film.year = req.body.year;
    if(await film.save()){//salva os dados e da uma resposta
        res.json({mensage: 'Filme alterado!'});
    }
    else {
        res.json({mensage: 'Erro ao alterar!'});
    }
    res.json(film);

}

async function deleteFilm(req, res){
    const film = await Film.findOne({where: {id: req.body.id}});//busca pelo id
    if(await film.destroy()){//deleta e da uma resposta
        res.json({mensage: 'Filme removido!'});
    }
    else {
        res.json({mensage: 'Erro ao remover!'});
    }
}
export {createFilm, listFilms, editFilm, deleteFilm};