import { Store } from "../models/storeModel.js"
import { errorHandler } from "../utils/Error.js"

export const createStore = async(req, res, next) => {
    console.log('creating store ....')
    const {storeName, coverImg} = req.body
    console.log(req.body)
    try {
        const newStore = new Store({
            name: storeName,
            coverImg,
            owner: req.customer
        })
        await newStore.save()
        res.status(201).json(newStore)
    } catch (error) {   
        next(error) 
    } 
} 