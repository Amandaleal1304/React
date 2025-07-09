import { Op } from "sequelize";//Op.or' para buscas com múltiplas condições (OU).
import User from "../../models/user.js";//dados do usuário para interagir com o banco
import bcrypt from "bcrypt";//para criptografar senhas.

// Renderiza a página de cadastro de usuário.
async function promptUser(req, res) {
    res.render('users/register');
}

// Cria um novo usuário no banco de dados.
async function createUser(req, res) {
    // Criptografa a senha recebida antes de salvar.
    const password = await bcrypt.hash(req.body.password, 10);// Salva o novo usuário com os dados do formulário e a senha criptografada.
    await User.create({
        name: req.body.name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: password
    });
    res.redirect('/users/login');// Redireciona para a página de login após o cadastro.
}


async function promptLogin(req, res) {// Renderiza a página de login.
    res.render('users/login');
}


async function login(req, res) {// Processa a tentativa de login do usuário.
    // Busca o usuário pelo email OU pelo nome de usuário.
    const user = await User.findOne({
        where: { [Op.or]: { email: req.body.user_name_or_email, user_name: req.body.user_name_or_email } }//busca pelo email OU pelo nome de usuário
    });

    // Se o usuário existe, verifica a senha.
    if (user) {
        // Compara a senha enviada com a senha criptografada no banco.
        const result = await bcrypt.compare(req.body.password, user.password);

        // Se a senha estiver correta, cria a sessão.
        if (result) {
            req.session.regenerate(async (err) => {
                req.session.user = user;      // Armazena o usuário na sessão.
                req.app.locals.user = user;   // Torna o usuário acessível nas views.
                res.redirect('/');            // Redireciona para a home.
            });
        }
    } else {
        // Se o usuário não existe ou a senha está errada, volta para o login.
        res.redirect('/users/login');
    }
}

// Encerra a sessão do usuário (logout).
async function logout(req, res) {
    req.session.destroy();          // Destrói a sessão.
    req.app.locals.user = null;   // Limpa o usuário das variáveis locais.
    res.redirect('/users/login');   // Redireciona para a tela de login.
}

// Middleware: verifica se o usuário está logado.
async function checkLogged(req, res, next) {
    // Se existe uma sessão com usuário, permite o acesso.
    if (req.session && req.session.user) {
        req.app.locals.user = req.session.user; // Garante que o usuário está disponível nas views.
        next(); // Continua para a próxima rota.
    } else {
        // Se não está logado, redireciona para o login.
        res.redirect('/users/login');
    }
}

// Exporta as funções para serem usadas nas rotas da aplicação.
export { promptUser, createUser, promptLogin, login, logout, checkLogged };