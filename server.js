const app = require("./app")
require("dotenv").config()
const port = process.env.PORT || 3000

 // Create GET request
 app.get("/", (req, res) => {
  res.send("Server is running and DB connect it, add to the of the URL of this page: /seeallpayments to see an example");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 

