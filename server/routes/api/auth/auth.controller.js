import * as responses from "../../../helpers/response.js";
import { db } from "../../../models/index.js";
import { compare, hash } from "../../../helpers/hashing.js";
const { users } = db;

export const register = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(!email) return responses.res400("Harap mengisi email", res);
        if(!password) return responses.res400("Harap mengisi password", res);

        if(password != confirmPassword) return responses.res400("Confirm password tidak sama", res);

        let checkEmail = await users.findOne({where: {email}});

        if (checkEmail) {
            throw new Error("Email sudah terdaftar");
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return responses.res400("Kata sandi harus berisi minimal satu huruf besar, satu digit, dan panjang minimal 8 karakter", res);
        }

        const hashedPassword = await hash(password);
        await users.create({email, password: hashedPassword});

        responses.res201("Berhasil mendaftar", null, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await users.findOne({where: {email}});

        if(!user) return responses.res400("Maaf, email belum terdaftar", res);
        if(user.status == "invalid") return responses.res400("Maaf, email belum tervalidasi", res);
        
        const correctPassword = await compare(user.password, password);

        if(!correctPassword) return responses.res400("Maaf, password anda salah", res);

        const dataSession = {
           id: user.id,
           email: user.email,
           role: user.role
        }

        req.session.user = dataSession;

        responses.res200("Berhasil login", null, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return responses.res500(res);
        }
        // Redirect atau response sesuai kebutuhan
        responses.res200("Berhasil logout", null, res);
    });
};
