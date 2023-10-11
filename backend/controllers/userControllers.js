// const asyncHandler = require('express-async-handler');
// const User = require("../models/userModel");
// const generateToken = require('../config/generateToken');
// const cloudinary  =  require('cloudinary').v2;


// cloudinary.config({ 
//     cloud_name: 'dzju40t2n', 
//     api_key: '996679312593118', 
//     api_secret: 'GNFNGdhBAG4_rmqoRgdaNFtfmrU',
//     secure: true
//   });

// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, pic} = req.body;

//     if(!name || !email || !password){
//         res.status(400);
//         throw new Error("Please enter all fields")
//     }

//     const userExists = await User.findOne({ email });

//     if(userExists) {
//         res.status(400);
//         throw new Error("User already exists");
//     }


//     const file  = req.files.pic;
//     cloudinary.uploader.upload(file.tempFilePath, (err , result)=>{
//         console.log(result);




//         const user = await User.create({
//             name : name,
//             email : email,
//             password : password,
//             pic :result.url,
//         })


//     });
    
    
    
//         if(user) {
//             res.status(201).json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 pic: user.pic,
//                 token: generateToken(user._id)
//             });
//         }   
//         else {
//             res.status(400);
//             throw new Error("Failed to create the user");
//         }


// });


// const authUser = asyncHandler(async(req,res) => {
//     const {email, password} = req.body;

//     const user = await User.findOne({email});

//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id),
//         })
//     }
//     else {
//         res.status(400);
//         throw new Error("Inavlid Email or Password");
//     }
// })

// module.exports = { registerUser, authUser };



const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const generateToken = require('../config/generateToken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzju40t2n',
    api_key: '996679312593118',
    api_secret: 'GNFNGdhBAG4_rmqoRgdaNFtfmrU',
    secure: true
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields")
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const file = req.files.pic;

    // Upload the image to Cloudinary and wait for the result
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        pic: result.secure_url, // Use secure_url to get HTTPS URL
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log("authroute here");
    const user = await User.findOne({ email });

    try {



        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(400);
            throw new Error("Invalid Email or Password");
        }
        
    } catch (error) {
        console.log("Error while login --> " , error);
        res.status(400).send({
            message: "error in login",
            error: error.message
        })
    }




    // if (user && (await user.matchPassword(password))) {
    //     res.json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         pic: user.pic,
    //         token: generateToken(user._id),
    //     })
    // }
    // else {
    //     res.status(400);
    //     throw new Error("Invalid Email or Password");
    // }
});


// /api/user?search=priyanshi (name)
// const allUsers = asyncHandler(async(req, res) => {
//     const keyword = req.query;
//     console.log(keyword);
// })

module.exports = { registerUser, authUser };
