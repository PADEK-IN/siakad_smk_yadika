import * as responses from "../../../helpers/response.js";
import { compare, hash } from "../../../helpers/hashing.js";
import Users from "../../../models/users.model.js";
import Murid from "../../../models/murid.model.js";
import { checkValidId, hashids } from "../../../helpers/isValidId.js";

export const register = async (req, res) => {
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

export const createMurid = async (req, res) => {
    try {
        const {
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, hobi, no_hp, sekolah_asal, no_ijazah, id_jurusan
        } = JSON.parse(req.body.data);

        const idJurusan = checkValidId(id_jurusan);
        if(!idJurusan) return responses.res400("ID jurusan tidak valid", res);

        const foto = req.file?.filename;

        const dataMurid = await Murid.findOne({
            where: {nis, email}
        })
        if(dataMurid) return responses.res400("Maaf, data murid sudah ada", res);

        const date = new Date();
        const tahun_masuk = date.getFullYear();
        console.log(tahun_masuk)
        await Murid.create({
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, hobi, no_hp, sekolah_asal, no_ijazah, tahun_masuk, 
            id_jurusan: idJurusan, foto
        });

        responses.res201("Berhasil mendaftar", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email) return responses.res400("Maaf, email belum diisi", res);
        if(!password) return responses.res400("Maaf, password belum diisi", res);

        let user = await Users.findOne({where: {email}});

        if(!user) return responses.res400("Maaf, email belum terdaftar", res);
        if(!user.isValid) return responses.res400("Maaf, email belum tervalidasi", res);
        
        const correctPassword = await compare(user.password, password);

        if(!correctPassword) return responses.res400("Maaf, password anda salah", res);
        
        req.session.user = {
           id: user.id,
           email: user.email,
           role: user.role,
           isValid: user.isValid
        };

        responses.res200("Berhasil login", user.role, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            // return responses.res500(res);
            return res.render("pages/error/500.ejs");
        }
        // Redirect atau response sesuai kebutuhan
        // responses.res200("Berhasil logout", null, res);
        return res.redirect("/login");
    });
};
