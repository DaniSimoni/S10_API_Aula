const Task = require('../../models/task')

async function updateTask (req, res)  {

    try {
        const taskInDataBase = await Task.findByPk(req.params.id)

        if (!taskInDataBase) {
            return res
            .status(404)
            .json({message: "Tarefa não encontrada"});
        }

        taskInDataBase.name = req.body.name;
        taskInDataBase.description = req.body.description;

        await taskInDataBase.save();

        res.json(taskInDataBase);

    } catch (error) {

        res.status(500).json({message: "Não foi possível processar sua atualização"})
    }
}

module.exports = updateTask