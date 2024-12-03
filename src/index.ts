import "tsconfig-paths/register";
import app from "./app";
// import connectToDatabase from "./models/db";

const port = process.env.PORT as string;
app.listen(port, () => {
  // connectToDatabase();
  /* eslint-disable no-console */
  console.log(`Server started on port: ${port}`);
  /* eslint-enable no-console */
});
