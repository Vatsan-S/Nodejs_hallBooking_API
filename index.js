import express from "express"
import cors from "cors"
import routers from "./Routers/routers.js"


const app = express()
const PORT = 4000

//middleware

app.use(express.json())
app.use(cors())

app.use("/api",routers)
app.listen(PORT,()=>{
    console.log("Iam listening on port",PORT)
})

app.get("/",(req,res)=>{
    res.status(200).send("Working")
})