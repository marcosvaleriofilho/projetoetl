import { Request, Response } from "express";
import UserRepository from "../repositories/user-repository";

class UserController {
    static createUser(req: Request, res: Response): void {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            res
                .status(400)
                .json({ message: "É necessário Email, Usuário e senha" });
            return;
        }

        UserRepository.createUser(
            {
                username,
                password,
                email,
            },
            (user) => {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(500).json({ message: "Falha ao criar usuário." });
                }
            }
        );
    }

    static getUserById(req: Request, res: Response): void {
        const userId = parseInt(req.params.id, 10);

        UserRepository.getUserById(userId, (user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Usuário não encontrado." });
            }
        });
    }
}
export default UserController;