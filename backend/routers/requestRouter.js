const express = require("express");
const router = express.Router();
const Request = require("../models/requestModel");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    }
};

router.post("/add", (req, res) => {
    console.log(req.body);
    new Model(req.body)
    .save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.get("/delete", (req, res) => {
    res.send("Hello from User's Delete Route");
});

router.get("/update", (req, res) => {
    res.send("Hello from User's Update Route");
});

router.get("/getall", (req, res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.put("/update/:id", (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

router.get("/getbyemail/:email", (req, res) => {
    Model.find({ email: req.params.email })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(500).json(err);
        console.log(err);
    }); 
});

module.exports = router;