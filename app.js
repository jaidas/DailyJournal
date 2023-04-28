//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Embrace the Power of Daily Reflection: Start Your Journey to Personal Growth with Our Daily Journal. Our carefully crafted prompts will guide you on a path of self-discovery, allowing you to reflect on your experiences, thoughts, and emotions. Make daily journaling a habit and witness the positive impact it can have on your life, from increased mindfulness to greater self-awareness. Join our community of like-minded individuals who are committed to becoming the best version of themselves, one day at a time";
const aboutContent =
  "At our daily journal website, we believe that self-reflection is an essential tool for personal growth and development. Our team of experienced writers and personal development experts have crafted a series of carefully curated prompts designed to guide you on a journey of self-discovery. Whether you're looking to enhance your mindfulness, increase your self-awareness, or simply gain a deeper understanding of your emotions and experiences, our daily journal is the perfect tool to help you achieve your goals.We are passionate about helping individuals from all walks of life unlock their full potential, and we believe that our daily journal can play a key role in this process. Join our community of like-minded individuals who are committed to becoming the best version of themselves, one day at a time. With our daily journal, you'll have the support and guidance you need to embrace the power of daily reflection and embark on a transformative journey of personal growth.";
const contactContent =
  "If you have any questions, comments, or feedback about our daily journal, we would love to hear from you. Our team is dedicated to providing the best possible experience for our users, and we are always looking for ways to improve our product.You can reach us by email at [jaidas1987@yahoo.com]. We will do our best to respond to your message as soon as possible.Thank you for your interest in our daily journal. We look forward to hearing from you and supporting you on your journey to personal growth.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutPage: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactPage: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const text = req.body.inputText;
  const newpost = req.body.postContent;

  const myPost = {
    title: text,
    content: newpost,
  };

  posts.push(myPost);
  res.redirect("/");
});

app.get("/posts/:test", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.test);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
