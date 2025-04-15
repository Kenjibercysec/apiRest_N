// simulando um banco de dados na memoria local
let users = [];

exports.getUsers = (req, res) => {
    // Retorna todos os usuários
    res.json(users);
};

exports.createUser = (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({message : 'Usuário criado com sucesso', user});
};

