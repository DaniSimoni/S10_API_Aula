const Task = require('../../models/task')

async function deleteTask (req, res) {

    try {
     
    await Task.destroy({
        where: {
            id: req.params.id
        }
    })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({message: "Não foi possível deletar os dados"})
    }
}

module.exports = deleteTask