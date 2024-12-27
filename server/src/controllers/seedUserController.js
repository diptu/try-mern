const User = require('../model/userModel');
const data = require('../data');


const seedUsers = async(req,res,next)=>{
try {
    // deliting all existing products
    await User.deleteMany({});
    // inserting new products
    const newUsers = await User.insertMany(data.users);

    // sussess response
    return res.status(201).json(newUsers);

} catch (error) {
    next(error);
}
}
module.exports = {
    seedUsers,
};
