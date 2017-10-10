import * as express from "express";

export class Home {
    public static getRoute(): express.Router {
        const homeRoute = express.Router();
        homeRoute.get("/", (req, res, next) => {
            res.render("index", { title: "Express" });
        });

        return homeRoute;
    }
}
