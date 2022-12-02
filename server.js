const app = require("./app")
require("dotenv").config()
const port = process.env.PORT || 3000

 // Create GET request
 app.get("/", (req, res) => {
  res.send("Server's running and DB connect it, go to the link to see the documentation and use the api server");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 

