import * as express from "express";

export class Index {
    public static init(router: express.Router): void {
        router.get("/", (req, res, next) => {
            res.render("index", { title: "Express" });
        });
    }
}
