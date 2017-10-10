import * as express from "express";

export class UserApi {
    public static getRoute(): express.Router {
        const userApi = express.Router();

        /**
         * @swagger
         * definitions:
         *   Users:
         *     required:
         *       - username
         *     properties:
         *       username:
         *         type: string
         *       path:
         *         type: string
         */

        /**
         * @swagger
         * tags:
         *   name: Users
         *   description: All about /users
         */

        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Add User
         *     description: Add user by username
         *     tags: [Users]
         *     parameters:
         *       - name: username
         *         description: User"s name
         *         in: formData
         *         type: string
         *         required: true
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success add user
         */
        userApi.post("/", (req, res, next) => {
            const result = this.addUser(req.body.username);
            res.json({ results: result });
        });

        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Get Users
         *     description: Get All Users
         *     tags: [Users]
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success get all users
         */
        userApi.get("/", (req, res, next) => {
            const result = this.getUsers();
            res.json({ results: result });
        });

        /**
         * @swagger
         * /users/{username}:
         *   put:
         *     summary: Update User
         *     description: Update username by username
         *     tags: [Users]
         *     parameters:
         *       - name: username
         *         description: User"s name
         *         in: path
         *         type: string
         *         required: true
         *       - name: name
         *         description: Name you want to edit
         *         in: formData
         *         type: string
         *         required: true
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success update user
         *       400:
         *         description: Can"t find user by username
         */
        userApi.put("/:username", (req, res, next) => {
            const result = this.updateUser(req.params.username, req.body.name);
            res.json({ results: result });
        });

        /**
         * @swagger
         * /users/{username}:
         *   delete:
         *     summary: Delete User
         *     description: Delete user by username
         *     tags: [Users]
         *     parameters:
         *       - name: username
         *         description: User"s name
         *         in: path
         *         type: string
         *         required: true
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Success delete user
         *       400:
         *         description: Can"t find user by username
         */
        userApi.delete("/:username", (req, res, next) => {
            const result = this.deleteUser(req.params.username);
            res.json({ results: result });
        });
        return userApi;
    }

    private static users = [];

    private static addUser(username: string): any[] {
        this.users.push(username);
        return this.users;
    }

    private static getUsers(): any[] {
        return this.users;
    }

    private static updateUser(username: string, newUserName: string): any[] {
        const user = this.users.indexOf(username);
        if (user > -1) {
            this.users.splice(user, 1, newUserName);
            return this.users;
        } else {
            throw new Error("can not find user");
        }
    }

    private static deleteUser(username: string): any[] {
        const user = this.users.indexOf(username);
        if (user > -1) {
            this.users.splice(user, 1);
            return this.users;
        } else {
            throw new Error("can not find user");
        }
    }
}
