import * as responses from "../../../../helpers/response.js";
import Users from "../../../../models/users.model.js";
import Guru from "../../../../models/guru.model.js";
import Murid from "../../../../models/murid.model.js";
import { hash } from "../../../../helpers/hashing.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";
import { Op } from 'sequelize';

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

export const getUserEmailByRole = async (req, res) => {
    try {
        const { role } = req.params;

        let registerEmailGuru;
        let registerEmailMurid;
        let email;

        if(role == "guru"){
            registerEmailGuru = await Guru.findAll({
                attributes: ["email"],
                raw: true
            });
            registerEmailGuru = registerEmailGuru.map(guru=>guru.email);

            email = await Users.findAll({
                attributes: ['email'],
                where: {
                  role,
                  email: {
                    [Op.notIn]: registerEmailGuru
                  }
                },
                raw: true
            });
        } else if(role == "murid"){
            registerEmailMurid = await Murid.findAll({
                attributes: ["email"],
                raw: true
            });
            registerEmailMurid = registerEmailMurid.map(murid=>murid.email);

            email = await Users.findAll({
                attributes: ['email'],
                where: {
                  role,
                  email: {
                    [Op.notIn]: registerEmailMurid
                  }
                },
                raw: true
            });
        } else if(role == "admin"){
            email = await Users.findAll({
                where: {role},
                attributes: ["email"],
                raw: true
            })
        } else {
            email = [];
        }

        responses.res200("Berhasil mengambil data", email, res);
    } catch (error) {
        console.log(error.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(!email) return responses.res400("Harap mengisi email", res);
        if(!password) return responses.res400("Harap mengisi password", res);

        let checkEmail = await Users.findOne({where: {email}});

        if (checkEmail) return responses.res400("Email sudah terdaftar", res);

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return responses.res400("Kata sandi harus berisi minimal satu huruf besar, satu digit, dan panjang minimal 8 karakter", res);
        }

        const hashedPassword = await hash(password);
        await Users.create({email, password: hashedPassword, role});

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

