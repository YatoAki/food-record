const Location = require("../models/location");
const Store = require("../models/store");
const async = require("async")

exports.locaiton_details = (req,res) => {
    let data = [];
    async.parallel([
        (callback) => {
            Store.find({location: req.params.id})
            .sort({name: 1})
            .then((store_list) => {
                data.push(store_list);
                callback();
            })
            .catch((err) => {
                callback(err);
            });
        },
        (callback) => {
            Location.findById(req.params.id)
            .then((location_data) => {
                data.push(location_data);
                callback();
            })
            .catch((err) => {
                callback(err);
            });
        }
    ], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render("location_detail", {
            title: data[1].name,
            store_list: data[0],
            location_data: data[1]
        });
    });
}

exports.locaiton_list = (req,res) => {
    Location.find()
        .sort({name: 1})
        .then((location_list) => {
            res.render("location_list",{title: "Location List", location_list: location_list} )
        })
}