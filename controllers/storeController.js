const Store = require("../models/store");
const Food = require("../models/food");
const async = require('async');

exports.store_details = (req, res) => {
    let data = [];
    async.parallel([
        (callback) => {
            Food.find({store: req.params.id})
            .sort({name: 1})
            .then((food_lists) => {
                data.push(food_lists);
                callback();
            })
            .catch((err) => {
                callback(err);
            });
        },
        (callback) => {
            Store.findById(req.params.id)
            .then((store_data) => {
                data.push(store_data);
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
        res.render("store_details", {
            title: data[1].name,
            store_data: data[1],
            food_list: data[0]
        });
    });
};

exports.store_list = (req,res,next) => {
    
    Store.find()
        .sort({name: 1})
        .then((store_list) => {
            res.render("store_list",{title: "Store List", store_list: store_list} )
        })
}