const Category=require("../models/Category");
const ApiError=require("../utils/ApiErrors");
const slugify=require("slugify");

const createCategory=async(data)=>{
    const {name}=data;
    const slug=slugify(name, {
        lower: true,
        trim: true,
        strict: true,
        });
        const existingCategory=await Category.findOne({
            $or:[
                {name},
                {slug}
            ]
        })
        if(existingCategory){
            throw new ApiError(409,"category already present")
        }
        const categoryData={
            name,
            slug
        }
        const newCategory=await Category.create(categoryData)
        return newCategory
    }
    
    const getAllCategories=async()=>{
        return await Category.find({isActive:true});
    }
    
    const updateCategory=async(id,data)=>{
        const category=await Category.findById(id)
        if(!category){
            throw new ApiError(404,"category not found")
        }
        const {name}=data
        if(name){
            const slug=slugify(name, {
                lower: true,
                trim: true,
                strict: true,
            });
            const existingCategory=await Category.findOne({
                $or:[
                    {name},
                    {slug}
                ],
                _id:{$ne:id}
            })
            if(existingCategory){
                throw new ApiError(409,"category already present")
            }
            category.name=name;
            category.slug=slug;

        }
        await category.save();
        return category
    }
    
    const deleteCategory=async(id)=>{
          const category = await Category.findById(id)
            if(!category){
                throw new ApiError(404,"Category not found");
            }
            if (!category.isActive) {
                throw new ApiError(400,"Category is already inactive");
            }
            category.isActive=false;
            await category.save();
            return category;
    }

    module.exports={createCategory,updateCategory,deleteCategory,getAllCategories}