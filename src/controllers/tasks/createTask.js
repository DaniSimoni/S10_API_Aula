const Task = require('../../models/task');

async function createTask (req, res) {

    try {

    const tarefa = {
        name: req.body.name,
        description: req.body.description,
        userId: req.body.user_id
        
    }

    if (!tarefa.name) {
        return res
        .status(401)
        .json({message: 'Nome é Obrigatório'});
    } 

    if (!tarefa.description) {
        return res
        .status(401)
        .json({message: 'Descrição é Obrigatório'});
    } 

    const tasksExist = await Task.findOne({where: {name: tarefa.name}})

    if (tasksExist !== null) {
        return res.status(201).json({message: 'Já existe tarefa igual'});
    }

    const newTask = await Task.create(tarefa)

    res.status(201).json(newTask); 

    } catch (error) {
        res.status(500).json({message: "Não foi possível processar sua solicitação"})
        console.log('Errou')
    }
};

module.exports = createTask
