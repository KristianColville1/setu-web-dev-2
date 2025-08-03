import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import { middleware } from "./middleware.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.use(middleware); // Attach all middleware
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");
app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`WeatherTop started on http://localhost:${listener.address().port}`);
});
