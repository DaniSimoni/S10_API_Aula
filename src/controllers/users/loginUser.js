const User = require('../../models/user');

async function loginUser (req, res) {
    
    try {

        const userInDataBase = await User.findOne({where: {cpf: req.body.cpf}})

        if (!userInDataBase) {
            return res.status(404).json({message: "Credenciais incorretas"});
        }
    
        const passwordIsValid = await bcrypt.compare(req.body.password, userInDataBase.password)
        
        if (!passwordIsValid) {
    
            return res.status(404).json({message:"CPF ou Senha incorretos"})
        }
          
           
            const token = jwt.sign(
            
            {
                id: userInDataBase.id,         
            },

            process.env.CHAVE_DO_TOKEN, 
            
            {
                expiresIn: '1h'
            }
            )  
            
            res.json({name: userInDataBase.name, token: token})


    } catch (error) {
            res.status(500).json({message: "Não foi possível processar sua solicitação"});
    }

}

module.exports = loginUser