import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as apis from "./apis";
import * as routes from "./routes";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public readonly app: express.Application;
    constructor() {
        this.app = express();

        this.routes();
        this.apis();
        this.config();
    }

    private config(): void {
        // view engine setup
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");

        // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const err: any = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        // error handler
        this.app.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    }

    private routes(): void {
        // visit: http://localhost:3000/
        const router = express.Router();
        routes.Home.register(router);
        this.app.use("/", router);
    }

    private apis(): void {
        // visit: http://localhost:3000/apis/users
        const router = express.Router();
        apis.Users.register(router);
        this.app.use("/apis", router);
    }
}
