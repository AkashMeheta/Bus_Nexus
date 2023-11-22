const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://akashmeheta:akash@busnexus.epqarun.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,    
}).then(() => {
    console.log("Connection Done");
}).catch((e) => {
    console.log(e);
});



// const uri = "mongodb+srv://user<:1234@busnexus.epqarun.mongodb.net/BusNexus?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

