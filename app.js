//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path')
const _ = require('lodash')
const app = express();




app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

///////////////// Mongoose  ///////////////

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://jadedvi104:thaivi104@cluster0.1wxpn.mongodb.net/ejs-challenge",{ useUnifiedTopology: true, useNewUrlParser: true});

//////////////////////////////////////////


///// Data Zone ////////


//// Starting content ///

const StrtconSchema = ({
  content: String
});

const Strtcon = mongoose.model("Strtcon", StrtconSchema);


var homeStartingContent = new Strtcon ({
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const aboutContent = new Strtcon ({
content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
});

const contactContent = new Strtcon ({

  content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."

})

//// compose ////
const composeSchema = ({
  title: {
      type: String,
      required: [true, "You need to fill the list!"],
  },
  content: String
});

const Compose = mongoose.model("Compose", composeSchema);


//// params /////
const paramSchema = {
  name: String,
  items: [composeSchema]
};

const Params = mongoose.model("Params", paramSchema);

/////////////////////////////////////

var posts = [];

app.get("/", function(req, res){

  Compose.find({}, function (err, foundItem){
    res.render("home", {
      startingContent: homeStartingContent.content,
      posts: foundItem
      });
  })
  
    
  });

  

  

  app.get('/post/:userId', function(req, res){
      
      var requestedPost = _.lowerCase(req.params.userId); 
      // request from /post/

      // Title and Post from /compose
      Compose.find({}, function(err, foundItem){ 
      foundItem.forEach(function(post)  { 

      var storedTitle = _.lowerCase(post.title);

      if ( storedTitle === requestedPost ) {
        
          res.render("requested", {
            title: post.title,
            content: post.content
            });
        
        // console.log("Match Found") 
      };
    }); 

  })
    //console.log(posts[0].title)
  });



app.get("/compose", function(req, res){
      res.render("compose");
});



app.post('/compose', function(req, res){


     var newPost = new Compose ({
      title: req.body.composeInput,
      content: req.body.textarea
     })

     newPost.save(function(err){

      if(!err){
        res.redirect("/");
      }
     });

      
    

});

app.get("/about", function(req, res){

  res.render("about", {startingAbout: aboutContent.content });

});


app.get("/contact", function(req, res){

  res.render("contact", {startingContact: contactContent.content });

});








app.listen(3000, function() {
  
  console.log("Server started on port 3000");
});