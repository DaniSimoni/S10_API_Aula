const jwt = require('jsonwebtoken');

function validateToken(req, res, next){

    console.log(req.headers.authorization)
    const token = req.headers.authorization

    if(!token || token === "Bearer") {
        return res.status(403).json({message: 'Ausência de Token'})
    }

    const tokenJwt = token.slice(7)

    jwt.verify(tokenJwt, 'MINHA_CHAVE_SECRETA', (error, conteudoDoToken) => {
        if (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(403).json({ message: 'Token Expirado' })
            } else if (error.name === "JsonWebTokenError") {
                return res.status(403).json({ message: 'Token inválido' })
            } else {
                return res.status(500).json({message: 'Internal server error'})
            }

        } else {
            console.log(conteudoDoToken)
            req.body.user_id = conteudoDoToken.id
           return next()
        }
    })}

module.exports = validateToken