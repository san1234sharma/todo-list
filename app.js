//jshint esversion:6
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
let items = ["Buy food","Cook food","Eat Food"];
let workitems = [];
app.set("view engine","ejs");
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    let today = new Date();
    let options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    let day = today.toLocaleDateString("en-US",options);
    res.render("list",{ListTitle:day,newListItems: items});
});
    app.post("/",function(req,res){
        let item = req.body.newItem;
        if(req.body.list === "Work"){
            workitems.push(item);
            res.redirect("/work");
        }
        else{
            items.push(item);
            res.redirect("/");
        }
    });
    app.get("/work",function(req,res){
        res.render("list",{ListTitle : "Work List",newListItems: workitems});
    });
    app.post("/work",function(req,res){
        let items = req.body.newItem;
        workitems.push(items);
        res.redirect("/work");
    });
    app.get("/about",function(req,res){
        res.render("about");
    });
app.listen(3000,function(){
    console.log("the server is running on port 3000");
})