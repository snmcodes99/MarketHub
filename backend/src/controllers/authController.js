const authService=require("../services/authService")

const register=async(req,res)=>{
    const data=req.body;
    const user=await authService.registerSerice(data);
    res.status(201).json({
        success:true,
        message:"User Created Succesfully",
        data:user
    })
}
const login=async(req,res)=>{
    const data=req.body;
    const cred=await authService.loginService(data)
    const {token,user}=cred
    res.status(200).json({
        success:true,
        message:"login successful",
        token,
        user
    })
}
const logout=()=>{}
const forgotPassword=()=>{}
const resetPassword=()=>{}

module.exports={register,login,logout,forgotPassword,resetPassword}