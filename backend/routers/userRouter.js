const express = require("express"); //req is the snippet for request
const jwt = require("jsonwebtoken"); //Importing the jsonwebtoken library for handling JWTs
require("dotenv").config(); //Loading environment variables from a .env file

const Model = require("../models/userModel.js"); //Importing the user model

const router = express.Router(); //Creating a new router object

router.post("/add", (req, res) => {
  //Defining a route for the root URL of this router
  // res.send("Hello from User's Add Route");         //Sending a response when the root URL of this router is accessed
    console.log(req.body);

    new Model(req.body)
    .save() //Saving the user data to the database
    .then((result) => {
      //Handling the successful save operation
      res.status(200).json(result); //Sending a JSON response with the saved user data
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the save operation
        console.log(err);
    });
});

router.get("/delete", (req, res) => {
  //Defining a route for the '/delete' URL of this router
  res.send("Hello from User's Delete Route"); //Sending a response when the '/delete' URL of this router is accessed
});

router.get("/update", (req, res) => {
  //Defining a route for the '/update' URL of this router
  res.send("Hello from User's Update Route"); //Sending a response when the '/update' URL of this router is accessed
});

router.get("/getall", (req, res) => {
  //Defining a route for the '/getall' URL of this router
  Model.find() //Finding all user documents in the database
    .then((result) => {
      //Handling the successful find operation
      res.status(200).json(result); //Sending a JSON response with all user data
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the find operation
        console.log(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  //Defining a route for the '/getbyid' URL of this router
    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.get("/getbycity/:city", (req, res) => {
  //Defining a route for the '/getbycity' URL of this router
  Model.find({ city: req.params.city }) //Finding user documents in the database that match the specified city
    .then((result) => {
      //Handling the successful find operation
      res.status(200).json(result); //Sending a JSON response with the matching user data
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the find operation
        console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  //Defining a route for the '/deletebyid' URL of this router
  Model.findByIdAndDelete(req.params.id) //Finding and deleting a user document by its ID
    .then((result) => {
      res.status(200).json(result); //Sending a JSON response confirming deletion
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the delete operation
        console.log(err);
    });
});

router.put("/update/:id", (req, res) => {
  //Defining a route for the '/updatebyid' URL of this router
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true }) //Finding and updating a user document by its ID with the provided data
    .then((result) => {
      res.status(200).json(result); //Sending a JSON response with the updated user data
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the update operation
        console.log(err);
    });
});

router.get("/getbyemail/:email", (req, res) => {
  //Defining a route for the '/getbyid' URL of this router
    Model.find({ email: req.params.email })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.post("/authenticate", (req, res) => {
  //Defining a route for user authentication
  Model.findOne(req.body) //Finding a user document that matches the provided credentials
    .then((result) => {
        if (result) {
        //Authentication successful
        //generate JWT token
        const { _id, name, email } = result; //Destructuring user details from the result

        const payload = { _id, name, email }; //Creating a payload for the JWT

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            (err, token) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Error in token generation" });
            } else {
              res.status(200).json({ token }); //Sending the generated JWT token as a response
            }
            }
        );
        } else {
        //Authentication failed
        res.status(401).json({ error: "Invalid Credentials" });
        }
    })
    .catch((err) => {
      res.status(500).json(err); //Handling any errors that occur during the find operation
        console.log(err);
    });
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Hash new password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invalid or expired token" });
  }
}); 

module.exports = router; //Exporting the router object to be used in other files