// import mongoose from "mongoose"

// const storeSchema = new mongoose.Schema({
//     name : {
//         type: String,
//         required: true,
//         unique: true
//     },
//     orders: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Order"
//         }
//     ],
//     catalog: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Product"
//         }
//     ],
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer",
//         required: true
//     },
//     coverImg: String
// },{timestamps: true})

// export const Store = mongoose.model("Store", storeSchema)