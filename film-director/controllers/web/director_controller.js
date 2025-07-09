
import Film from "../../models/film.js";
import Director from "../../models/director.js";

async function createDirector(req, res) {


    const director = await Director.create({

        name: req.body.name,

        age: req.body.age,

        telephone: req.body.telephone

    });
    res.render('alerts', { title: 'Directors', body: 'Director created.' });
}

async function listDirectors(req, res) {

    const list = await Director.findAll({ include: [Film], raw: true });
    res.render('director/director', { directors: list });///director e o nome da minha pasta na view e o proximo o nome da view

}

//1º fase - exibição do formulário preenchido
async function editDirector(req, res) { 

    const director = await Director.findOne({ where: { id: req.body.id } });

    res.render('director/director', { action: 'edit', director_editing: director.dataValues });

}


//2º fase - processamento - alterar as propriedades e salvar
async function saveDirector(req, res) { 

    const director = await Director.findOne({ where: { id: req.body.id } });

    director.name = req.body.name;

    director.age = req.body.age;

    director.telephone = req.body.telephone;

    await director.save();

    res.render('alerts', { title: 'Directors', body: 'Director edited.' });

}



async function deleteDirector(req, res) {

    const director = await Director.findOne({ where: { id: req.body.id } });

    await director.destroy();

    res.render('alerts', { title: 'Directors', body: 'Director deleted.' });

}


export { createDirector, listDirectors, editDirector, saveDirector, deleteDirector };

