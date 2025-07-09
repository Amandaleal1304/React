import Gender from "../../models/gender.js";

async function createGender(req, res) { //req é a requisicao que chega 

    const gender = await Gender.create({
        name: req.body.name,
        description: req.body.description
    });


    res.render('alerts', { title: 'Genders', body: 'Gender created.' });

}

async function listGenders(req, res) {
    const list = await Gender.findAll({raw: true});//nclude: [Film] lista completa o raw true é pra limpar a execução 
    console.log(list);
    res.render('genders/gender', { genders: list });//app.js a router / nome do arquivo handlebars
}

async function editGender(req, res) {
    const gender = await Gender.findOne({ where: { id: req.body.id } });//busca pelo id
    res.render('genders/gender', { action: 'edit', gender_editing: gender.dataValues });//app.js a router / nome do arquivo handlebars

}

async function saveGender(req, res) {

    const gender = await Gender.findOne({ where: { id: req.body.id } });

    gender.name = req.body.name;

    gender.description = req.body.description;

    await gender.save();

    res.render('alerts', { title: 'Genders', body: 'Genders edited.' });

}

async function deleteGender(req, res) {
    const gender = await Gender.findOne({ where: { id: req.body.id } });//busca pelo id
    await gender.destroy();
    res.render('alerts', { title: 'Genders', body: 'Gender deleted.' });
}

export { createGender, listGenders, editGender, deleteGender, saveGender };