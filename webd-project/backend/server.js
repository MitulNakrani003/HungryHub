import path from "path";
import express, { response } from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import fooditemRoutes from "./routes/fooditemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import nodemailer from "nodemailer"; 

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/fooditems", fooditemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
   res.send(process.env.PAYPAL_CLIENT_ID)
 )

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

//nodemailer code

// function sendEmail(){
//   return new Promise((resolve, reject)=>{

//     var transporter=nodemailer.createTransport({
//       service: "gmail",
//       auth:{
//         user:'connectionmongo@gmail.com',
//         password: bwvugehawmkmplsb
//       }
//     })
//     const mail_configs={
//       from:'connectionmongo@gmail.com',
//       to:'tripathi.su@northeastern.edu',
//       subject:'Testing email',
//       text: "Checking if email works"
//     }
//     transporter.sendMail(mail_configs, function(error,infor){
//       if(error){
//         console.log(error); 
//         return reject({message:`An error has occured`})
//       }
//       return resolve({message :"Email sent successfully"})
//     })
//   })
// }

// app.get('/sendemail', (req,res)=>{
//   sendEmail()
//   .then(response=>res.send(response.message))
//   .catch(error=>res.status(500).send(error.message))
// })

const PORT = 5001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
