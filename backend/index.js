import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./db/db.js"
import router from "./routes/user.route.js"
dotenv.config()
const app = express()

// form .env file 
const PORT = process.env.PORT || 5000
app.use(express.json())


// api 
app.use('/user', router)

// server running
app.listen(PORT, () => {
    connectDb()
    console.log(`Server runnning at PORT 8000 http://localhost:${PORT}`);
})