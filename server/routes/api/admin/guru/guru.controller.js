import * as responses from "../../../../helpers/response.js";
import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";
import Users from "../../../../models/users.model.js";

export const getAll = async (req, res) => {
    try {
        const dataGuru = await Guru.findAll();

        const data = dataGuru.map((guru) => {
            return {
              ...guru.dataValues,
              id: hashids.encode(guru.id)
            };
          });

        responses.res200("Berhasil mengambil data guru", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID guru tidak valid", res);
        const dataGuru = await Guru.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataGuru.dataValues,
            id: hashids.encode(dataGuru.id),
        };
        
        responses.res200("Berhasil mengambil data guru", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const create = async (req, res) => {
    try {
        const { 
            email, nip, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, agama, no_hp, pendidikan, id_mata_pelajaran, status 
        } = JSON.parse(req.body.data);

        const foto = req.file?.filename;
        const idMapel = checkValidId(id_mata_pelajaran);
        if(!idMapel) return responses.res400("ID mata pelajaran tidak valid", res);

        await Guru.create({
            email, nip, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, agama, no_hp, pendidikan, id_mata_pelajaran: idMapel, foto, status
        });

        await Users.update({isValid: true},{where: {email}});

        responses.res201("Guru baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID Guru tidak valid", res);
        
        const { 
            email, nip, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, agama, no_hp, pendidikan, id_mata_pelajaran, status 
        } = JSON.parse(req.body.data);
        const idMapel = checkValidId(id_mata_pelajaran);
        if(!idMapel) return responses.res400("ID mata pelajaran tidak valid", res);
        
        const foto = req.file?.filename;

        const respons = await Guru.update({
            email, nip, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat, agama, no_hp, pendidikan, id_mata_pelajaran: idMapel, foto, status
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, guru tidak ditemukan", res);
        responses.res200("Data guru berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID guru tidak valid", res);
        
        const guru = await Guru.findOne({
            where: { id: validId },
        });
        
        if(!guru) return responses.res400("Maaf, data guru tidak ditemukan", res);

        const email = guru.email;

        await Users.destroy({
            where: {email}
        });

        await Guru.destroy({
            where: {id: validId}
        });
        responses.res200("Data guru berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

