const Task = require('../../models/task');

async function findTasks (req, res) {
    try {
           const tasks = await Task.findAll({
            where: {
            user_id: req.body.userId
           }})
           res.json(tasks)

    } catch (error) {
        res.status(500).json({message: "Não foi possível processar sua solicitação"})
    }
}

module.exports = findTasks