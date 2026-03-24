require("dotenv").config();
const { connectMongo } = require('./config/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const editorRoute = require("./routes/editor.route");
const commentRoute = require("./routes/comment.route");
const reactionRoute = require("./routes/reaction.route");
const bookmarkRoute = require("./routes/bookmark.route");

//Connect MongoDB
connectMongo(process.env.MONGO_URI);
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Assign routes
app.use("/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/editor", editorRoute);
app.use("/comment", commentRoute);
app.use("/reaction", reactionRoute);
app.use("/bookmark", bookmarkRoute);

module.exports = app;