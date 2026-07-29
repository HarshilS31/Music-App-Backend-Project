import app from "./src/app.js"
import dotenv from "dotenv"
import dns from "dns"
import connectDB from "./src/db/db.js"
dns.setServers([`8.8.8.8`,`8.8.4.4`])
dotenv.config()
const PORT = process.env.PORT || 3000
connectDB()
app.listen(PORT,()=>{
    console.log("App is working on port",PORT)
})