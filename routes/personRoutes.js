// const express = require("express");
// const router = express.Router();
// const Person = require("./../models/person");
// const { jwtAuthMiddleware, generateToken } = require("./../jwt");
// const { use } = require("passport");

// //POST route to add a person :

// router.post("/signup", async (req, res) => {
//   try {
//     const data = req.body; // Assuming the request body contains the person data

//     //Create a new person document using the Mongoose model
//     const newPerson = new Person(data);

//     //Save the newPerson to the database:
//     const response = await newPerson.save();
//     console.log("Person Data Saved");

//     const payLoad = {
//       id: response.id,
//       username: response.username,
//     };
//     console.log(JSON.stringify(payLoad));
//     const token = generateToken(payLoad);
//     console.log("Token is:", token);

//     res.status(200).json({ response: response, token: token });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ Error: "Internal Server Error" });
//   }
// });

// //Login Route
// router.post("/login", async (req, res) => {
//   try {
//     //Extract the username and password from request body
//     const { username, password } = req.body;

//     //Find the user by username
//     const user = await Person.findOne({ username: username });

//     //If the user does not exists or the password does not match,return error
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     //Generate Token
//     const payLoad = {
//       id: user.id,
//       username: user.username,
//     };

//     const token = generateToken(payLoad);

//     //return token as response
//     res.json({ token });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //Profile Route
// router.get("/profile", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userData = req.user;
//     console.log("User Data", userData);

//     // Extract user id from decoded token
//     const userId = userData.id;

//     // Find the user by id
//     const user = await Person.findById(userId);
//     res.status(200).json({ user });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //GET method to get the person
// router.get('/', jwtAuthMiddleware, async (req, res) =>{
//   try{
//       const data = await Person.find();
//       console.log('data fetched');
//       res.status(200).json(data);
//   }catch(err){
//       console.log(err);
//       res.status(500).json({error: 'Internal Server Error'});
//   }
// })

// //Parametrized API calls
// router.get("/:workType", async (req, res) => {
//   //Here WorkType is name of a variable

//   try {
//     const workType = req.params.workType; //Extract the workType from the URL parameter
//     if (workType == "chef" || workType == "manager" || workType == "waiter") {
//       const response = await Person.find({ work: workType });
//       console.log("Work Data Fetched Successfully");
//       res.status(200).json(response);
//     } else {
//       res.status(404).json({ error: "Invalid Work Type" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ Error: "Internal Server Error" });
//   }
// });

// //Update Route For Person :
// router.put("/:id", async (req, res) => {
//   try {
//     const personId = req.params.id; //Extract the id from the URL Parameter.
//     const updatedPersonData = req.body; //Updated Data for the person

//     const response = await Person.findByIdAndUpdate(
//       personId,
//       updatedPersonData,
//       {
//         new: true, //Return the updated document
//         runValidators: true, //Run Mongoose validation
//       }
//     );
//     if (!response) {
//       return res.status(404).json({ error: "Person Not Found" });
//     }

//     console.log("Person Data Updated");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //Delete Route For Person :
// router.delete("/:id", async (req, res) => {
//   try {
//     const personId = req.params.id; //Extract the id from the URL Parameter.

//     //Assuming you have a Person Model
//     const response = await Person.findByIdAndDelete(personId);

//     if (!response) {
//       return res.status(404).json({ error: "Person Not Found" });
//     }
//     console.log("Person Data Deleted");
//     res.status(200).json({ message: "Person Deleted Successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType; // // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;
