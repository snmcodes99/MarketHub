const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiErrors");
const jwt = require("jsonwebtoken");
const registerSerice = async (data) => {
    const { name, email } = data;
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
        throw new ApiError(409, "email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER",
    };
    const user = await UserModel.create(userData);
    return user;
};

const loginService = async (data) => {
    const { email, password } = data;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid Credentials");
    }
    const hashedpassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedpassword);
    if (!isMatch) {
        throw new ApiError(401, "Invalid Credentials");
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            id: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );
    return {
        user,
        token,
    };
};

const getCurrentUser=async(userData)=>{
    const user=await UserModel.findById(userData._id)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    return user
}

const changePassword=async(userData,passwordData)=>{
    const {currentPassword,newPassword}=passwordData
    const user=await UserModel.findById(userData._id).select("+password")
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordCorrect=await bcrypt.compare(currentPassword,user.password)
    if(!isPasswordCorrect){
        throw new ApiError(401,"Current password is incorrect")
    }
    user.password=await bcrypt.hash(newPassword,10)
    await user.save()
    return
}

const logout=async()=>{
    return
}

module.exports = { registerSerice, loginService, getCurrentUser, changePassword, logout};
