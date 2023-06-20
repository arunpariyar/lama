const app = require("./index")

require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3100;

console.log(process.env.DB_NAME);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
