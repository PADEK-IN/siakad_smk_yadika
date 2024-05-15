import * as responses from "../../../../helpers/response.js";
import Users from "../../../../models/users.model.js";
import { hash } from "../../../../helpers/hashing.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataUsers = await Users.findAll({attributes: {
            exclude: ["password"]
        }});

        const data = dataUsers.map((user) => {
            return {
              ...user.dataValues,
              id: hashids.encode(user.id)
            };
          });

        responses.res200("Berhasil mengambil data user", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        const dataUser = await Users.findOne({
            where: { id: validId },
            attributes: {
                exclude: ["password"]
            },
        });

        const data = {
            ...dataUser.dataValues,
            id: hashids.encode(dataUser.id),
        };
        
        responses.res200("Berhasil mengambil data user", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email) return responses.res400("Harap mengisi email", res);
        if(!password) return responses.res400("Harap mengisi password", res);

        let checkEmail = await Users.findOne({where: {email}});

        if (checkEmail) return responses.res400("Email sudah terdaftar", res);

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return responses.res400("Kata sandi harus berisi minimal satu huruf besar, satu digit, dan panjang minimal 8 karakter", res);
        }

        const hashedPassword = await hash(password);
        await Users.create({email, password: hashedPassword});

        responses.res201("User baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const { email, role, isValid } = req.body;
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        
        const respons = await Users.update({
            email, role, isValid,
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, user tidak ditemukan", res);
        responses.res200("User berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        
        const respons = await Users.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, user tidak ditemukan", res);
        responses.res200("User berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

