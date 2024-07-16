const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling unCaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unCaught Exception`);
    process.exit(1);
})

//configs
dotenv.config({path:"backend/config/confige.env"});

//connecting to Database
connectDatabase();




const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandles promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})