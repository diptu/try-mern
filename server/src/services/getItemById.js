const createError = require('http-errors')
const { mongoose } = require('mongoose');
const findById = async(model,id, options={})=>{
    try {

    const item = await model.findById(id, options);

    if(!item) {
      throw createError(404, `${model.modelName} doesn\'t exist`);
    }
    return item;
        
    } catch (error) {
        if(error instanceof mongoose.Error) {
            throw createError(404, `Invalid ${model.modelName} id!`);
        }
        throw error;
        
    }
}

module.exports = {findById};