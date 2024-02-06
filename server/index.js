const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()
const PORT = process.env.PORT || 4000

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors())
app.use(express.json());

require("./config/database").connect()

//route import & mount
const index = require("./routes/index");
app.use("/api/v1", index)

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})