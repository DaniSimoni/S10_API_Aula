const User = require('../../models/user');

async function updateUser (req, res)  {

    try {

        const userInDataBase = await User.findOne({where: {cpf: req.body.cpf}})

        if (userInDataBase) {
            return res
            .status(409)
            .json({message: 'CPF já foi cadastrado anteriormente'})
        }     
 

        const hash = await bcrypt.hash(req.body.password, 10)

        const newUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            password: hash
        }

        const {name} = await User.create(newUser);
        res.status(201).json(name);

    } catch (error) {
        res.status(500).json({message: "Não foi possível processar sua solicitação"});
    }

}

module.exports = updateUser