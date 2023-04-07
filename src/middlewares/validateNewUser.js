const yup = require('yup');

const validation = yup.object().shape({
    name: yup.string('O nome deve ser uma string').required('Nome é obrigatório'),
    password: yup.string().min(4,"A senha deve ter no").required("Senha é Obrigatória")
})

function validateNewUser(req, res, next) {
    console.log("dado original", req.body)

try {
    validation.validateSync(req.body)
    next()
} catch (error) {
    res.status(400).json({message: error.message});
}
   
}

module.exports = validateNewUser