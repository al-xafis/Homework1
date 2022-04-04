const { app } = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log("Server is running at port: " + process.env.PORT);
});
