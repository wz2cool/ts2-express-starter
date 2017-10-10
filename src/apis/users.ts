import * as express from "express";

export class Users {
    public static init(router: express.Router): void {
        router.get("/users", (req, res, next) => {
            res.send("this is users apis");
        });
    }
}
