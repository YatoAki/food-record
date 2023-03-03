#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Food = require('./models/food')
const Location = require('./models/location')
const Rating = require('./models/rating')
const Store = require('./models/store')


const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const foods = []
const locations = []
const ratings = []
const stores = []

LocationCreate = (name,cb) => {

    const location = new Location({name:name});
    location.save()
        .then( () =>{
            console.log('New Location: ' + location)
            locations.push(location)
            cb(null, location)
        })
}

StoreCreate = (name, location, cb) => {
    const store = new Store({name:name,location:location});

    store.save()
        .then( () =>{
            console.log('New store: ' + store)
            stores.push(store)
            cb(null, store)
        })
}

FoodCreate = (name,price,store,cb) => {
    const food = new Food({name:name,price:price,store:store});
    
    food.save()
        .then( () =>{
            console.log('New food: ' + food)
            foods.push(food)
            cb(null, food)
        })
}

RatingCreate = (rating,people,food,cb) => {
    const newRating = new Rating({rating:rating,people:people,food:food});
    

    newRating.save()
        .then( () =>{
            console.log('New rating: ' + newRating)
            ratings.push(newRating)
            cb(null, newRating)
        })
}


createLocationStore = (cb) => {
    async.series([
        (callback) => {
            LocationCreate("Mandalay",callback);
        },
        (callback) => {
            LocationCreate("Yangon",callback);
        },
        (callback) => {
            LocationCreate("Pyin Oo Lwin",callback);
        },
        (callback) => {
            StoreCreate("Ko Ko Fu", locations[0],callback);
        },
        (callback) => {
            StoreCreate("Merry Brown", locations[2],callback);
        },
        (callback) => {
            StoreCreate("Spicy Pot", locations[1],callback);
        },
        (callback) => {
            StoreCreate("KFC", locations[0],callback);
        },
    ],cb)
}

createFoodRating = (cb) => {
    async.series([
        (callback) => {
            FoodCreate("Fried Chicken",5800,stores[3],callback);
        },
        (callback) => {
            FoodCreate("Rice Box",4500,stores[3],callback);
        },
        (callback) => {
            FoodCreate("Popcorn Chicken",3000,stores[3],callback);
        },
        (callback) => {
            FoodCreate("Mala Htan",15000,stores[0],callback);
        },
        (callback) => {
            FoodCreate("Sea Food Mala xiang guo",20000,stores[0],callback);
        },
        (callback) => {
            FoodCreate("Mala xiang guo",15000,stores[2],callback);
        },
        (callback) => {
            FoodCreate("Friend Chicken",1800,stores[1],callback);
        },
        (callback) => {
            RatingCreate(3,10,foods[0],callback)
        },
        (callback) => {
            RatingCreate(2,8,foods[1],callback)
        },
        (callback) => {
            RatingCreate(3,12,foods[2],callback)
        },
        (callback) => {
            RatingCreate(3,200,foods[3],callback)
        },
        (callback) => {
            RatingCreate(4,150,foods[4],callback)
        },
        (callback) => {
            RatingCreate(1,19,foods[5],callback)
        },
        (callback) => {
            RatingCreate(5,10,foods[6],callback)
        },

        
    ],cb)
}




async.series([
    createLocationStore,
    createFoodRating
],
// Optional callback
cb = (err, results) => {
    if (err) {
        console.log('FINAL ERR: ');
    }
    else {
        console.log('BOOKInstances: ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
