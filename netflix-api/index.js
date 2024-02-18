const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/netflix",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}) .then(() => {
  console.log("db connected successfully");
})
.catch((eroor)=>{
  console.log("error occured");
  console.log(error);
  process.exit(1);
})

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
