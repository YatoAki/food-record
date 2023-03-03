const Location = require("../models/location");

exports.locaiton_details = (req,res) => {
    res.send("NOt IMplemented: locaiton Details")
}

exports.locaiton_list = (req,res) => {
    Location.find()
        .sort({name: 1})
        .then((location_list) => {
            res.render("location_list",{title: "Location List", location_list: location_list} )
        })
}