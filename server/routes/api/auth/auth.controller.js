import * as responses from "../../../helpers/response.js";
import { db } from "../../../models/index.js";
import { compare, hash } from "../../../helpers/hashing.js";
const { users } = db;

export const register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(!email) throw new Error("Harap mengisi email");
        if(!password) throw new Error("Harap mengisi password");

        if(password != confirmPassword) throw new Error("Confirm password tidak sama");

        let checkEmail = await users.findOne({where: {email}});
        console.log(checkEmail)
        if (checkEmail) {
            throw new Error("Email sudah terdaftar");
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Kata sandi harus berisi minimal satu huruf besar, satu digit, dan panjang minimal 8 karakter");
        }

        const hashedPassword = await hash(password);
        const compares = await compare("Admin@123", hashedPassword)
        console.log({compares})
        console.log({hashedPassword})
        await users.create({email, hashedPassword});

        responses.res201("Berhasil mendaftar");
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

export const login = (req, res) => {
    responses.res200("Login successfull", null, res)
};

export const logout = (req, res) => {
    responses.res200("Logout successfull", null, res)
};
