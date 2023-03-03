const Food = require("../models/food");
const Rating = require("../models/rating");
const async = require("async")
exports.food_details = (req,res) => {
    let data = [];
    async.parallel([
        (callback) => {
            Food.findById(req.params.id)
            .then((food_data) => {
                data.push(food_data);
                callback();
            })
            .catch((err) => {
                callback(err);
            });
        },
        (callback) => {
            Rating.find({food:req.params.id})
            .then((rating_data) => {
                data.push(rating_data);
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
        res.render("food_detail", {
            title: data[1].name,
            food_data: data[1],
            rating_data: data[0]
        });
    });
}