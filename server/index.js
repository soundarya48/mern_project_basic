import express from 'express'
import cors from 'cors'
import connectDb from "./db/db.js";
import route from "./routes/routes.js";

const PORT = 5000;
const app = express()

connectDb();  // db function

//midd
app.use(cors())
app.use('/api', route)

app.listen(PORT, () => {
    console.log("app is running in", PORT);
})
