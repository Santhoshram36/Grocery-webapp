const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://santhosh36:santhosh36@cluster0.xichh.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017