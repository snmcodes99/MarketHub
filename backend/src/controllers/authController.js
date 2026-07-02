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

const getCurrentUser=async(req,res)=>{
    const user=await authService.getCurrentUser(req.user)
    res.status(200).json({
        success:true,
        message:"User fetched successfully",
        data:user
    })
}

const changePassword=async(req,res)=>{
    await authService.changePassword(req.user,req.body)
    res.status(200).json({
        success:true,
        message:"Password changed successfully"
    })
}
const logout=async(req,res)=>{
    await authService.logout()
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}
module.exports={register,login,getCurrentUser,changePassword,logout}