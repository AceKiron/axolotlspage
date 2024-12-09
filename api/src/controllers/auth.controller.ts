import CatchErrors from "../utils/catchErrors";
import { registerUser } from "../services/auth.service";
import { CREATED } from "../constants/http";

export const registerHandler = CatchErrors(async (req, res) => {
    console.log(req.body);

    const result = await registerUser({
        email: req.body.email,
        password: req.body.password
    });

    if (!result.success) {
        return res.status(result.err.status).send({
            message: result.err.message
        });
    }

    return res.sendStatus(CREATED);
});