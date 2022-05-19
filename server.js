const express = require("express")
const userRoute = require("./Source/Twitter/routes")
const app = express();
const port = 2000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/v1/twitter", userRoute)

app.listen(port,() => 
console.log(`Server is listening on port ${port}....`))