const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/busnexus1", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
}).then(() => {
    console.log("Connection Done");
}).catch((e) => {
    console.log(e);
});

