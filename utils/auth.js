import jwt from 'jsonwebtoken'

const signToken = (user) => {
    return jwt.sign(
        {
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin
        }, 

        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );
};
const isAuth = async (req, res, next ) => {
    const{authorization} = req.headers;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
               res.status(401).send({message: 'Not authorized'});
            } else {

                req.user = decoded;
                next();
            }
        })

    } else {
        res.status(401).send({message: 'Token is not supplied'});
    }
}   

export { signToken, isAuth };