require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/Product");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/debug")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api", productRoutes);
const port = process.env.PORT || 3000;
app.post("/api/products", async(req, res) =>{
    try{   
        //get data from body request
        // Secure
        const {name, price, category} = req.body;
        
        //create new post (save)
        const product = await Product.create({
            name,
            price,
            category
        });
res.json({
    success: true,
    msg: "Done",
    data: product,
});
    }
    catch(error){
        console.log(error);
    }
});

app.get("/api/products", async(req,res) =>{
    try{

        const product = await Product.find();
        res.json({
            data: products,
        });
    }
    catch(error){
 console.log(error);
    }
});
app.listen(port, () =>{ console.log(`Server Running ${port}`)});
