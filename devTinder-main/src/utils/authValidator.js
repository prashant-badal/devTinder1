const { isEmail, isStrongPassword } = require("validator")


const authValidatorSignUp=(req)=>{

const AllowedField=["name", "email","password"]

const IsFieldAllows= Object.keys(req.body).every((k)=>{
    return AllowedField.includes(k)
})

if(!IsFieldAllows){
    throw new Error("PAyload Error")
}

const {name, email,password}=req.body



if(!name.trim() || !email.trim() || !password.trim()){
    throw new Error("Enter required fields")
}

if (!isEmail(email)){
        throw new Error("Enter weak Email")

}

if (!isStrongPassword(password)){
        throw new Error("Enter weak password")

}

}

const authValidatorLogin=(req)=>{

const AllowedField=[ "email","password"]

const IsFieldAllows= Object.keys(req.body).every((k)=>{
    return AllowedField.includes(k)
})

if(!IsFieldAllows){
    throw new Error("PAyload Error")
}

const { email,password}=req.body



if(!email.trim() || !password.trim()){
    throw new Error("Enter required fields")
}

if (!isEmail(email)){
        throw new Error("Enter weak Email")

}

if (!isStrongPassword(password)){
        throw new Error("Enter weak password")

}

}

module.exports={authValidatorSignUp,authValidatorLogin}