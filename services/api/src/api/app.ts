const path = require("path");

const express = require("express");

const app = express();

const helmet = require("helmet");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const dotenv = require("dotenv");

const morgan = require("morgan");

dotenv.config();

app.use(express.static("web-build"));

app.use(
  express.static(path.join(__dirname, "../../docs/database", "schema.html"))
);

app.use(helmet());

app.use(morgan("tiny"));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// ###[  Routers ]###
import indexRouter from "./routes/index/index";
import usersRouter from "./routes/users";
import orgsRouter from "./routes/orgs";
import sheltersRouter from "./routes/shelters";
import reservationsRouter from "./routes/reservations";
import householdRouter from "./routes/household";
import memberRouter from "./routes/members";

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/orgs", orgsRouter);
app.use("/api/shelters", sheltersRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/households", householdRouter);
app.use("/api/members", memberRouter);

app.get("/docs/database", (req: any, res: any) => {
  console.log(path.join(__dirname, "../../docs/database", "schema.html"))
  res.sendFile(path.join(__dirname, "../../docs/database", "schema.html"));
});

export default app;
