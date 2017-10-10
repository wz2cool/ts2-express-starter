import * as express from "express";

export class Users {
    public static register(router: express.Router): void {
        router.get("/users", (req, res, next) => {
            res.send("this is users apis");
        });
    }
}
