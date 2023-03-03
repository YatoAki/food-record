const Store = require("../models/store");

exports.store_details = (req,res) => {
    res.send("NOt IMplemented: store Details")
}

exports.store_list = (req,res,next) => {
    
    Store.find()
        .then((store_list) => {
            res.render("store_list",{title: "Store List", store_list: store_list} )
        })
}