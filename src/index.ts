import { server } from "./server";
import { connect } from "mongoose";

const start = async () => {
  try {
    const mongoPort = process.env.DB_PORT || 27017;
    const mongoUrl = process.env.DB_URL || "localhost";
    const dbName = "b-archive";
    await connect(`mongodb://${mongoUrl}:${mongoPort}/${dbName}`);
    const port = process.env.PORT || 3000;
    await server.listen(port);
    server.log.info("Connected to Database");
    server.log.info(`Server Running on PORT ${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
