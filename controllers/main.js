const jwt=require("jsonwebtoken");
const customAPIerror=require('../errors/custom-error');
const login = async (req, res) => {
    const {username,password}=req.body;
    // mongoose validation
    // joi
    if(!username || !password){
        throw new customAPIerror("please provide email and password",400)
    }
    // just for demo normally provided by db
    const id= new Date().getDate();
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(username,password);
    res.status(200).json({msg:"user created",token});
};

const dashboard = async (req, res) => {
    // Ensure the user is authenticated and req.user is set by the middleware
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secret: `Here is your authorized data, ${luckyNumber} is your lucky number`
    });
};

module.exports = {
    login,
    dashboard,
};
