const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();

let items = [];
let workItem = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req,res) {

    let day = date.getDate();

    res.render("list.ejs", {
        kindOfList: day,
        newItem: items
    });
})

app.post("/", function (req,res){

    if(req.body.list === "Work")
    {
        workItem.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
    items.push(req.body.newItem);
    res.redirect("/");
    }
});

app.get("/work", function (req,res)
{
    res.render("list",{
        kindOfList: "Work List",
        newItem: workItem
    });
});

app.listen(3000,function () {
    console.log("Server is running on port 3000.")
});