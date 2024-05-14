import * as responses from "../../../../helpers/response.js";
import Users from "../../../../models/users.model.js";

export const create = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(!email) return responses.res400("Harap mengisi email", res);
        if(!password) return responses.res400("Harap mengisi password", res);
        if(password != confirmPassword) return responses.res400("Confirm password tidak sama", res);

        let checkEmail = await Users.findOne({where: {email}});

        if (checkEmail) return responses.res400("Email sudah terdaftar", res);

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return responses.res400("Kata sandi harus berisi minimal satu huruf besar, satu digit, dan panjang minimal 8 karakter", res);
        }

        const hashedPassword = await hash(password);
        await Users.create({email, password: hashedPassword});

        responses.res201("Berhasil mendaftar", null, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

