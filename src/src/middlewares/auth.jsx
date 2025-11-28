const adminAuth=(req,res,next)=>{
    const tokens=1234

    console.log("working for auth admin")
const isAuthorized= tokens===1234
    if(!isAuthorized){
        console.log("unAuthorized")
        res.status(401).send("unAuthorized user")
        
    }
    else{
        next()
    }
};

module.exports={adminAuth};