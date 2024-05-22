import * as responses from "../../../../helpers/response.js";
import Kelas from "../../../../models/kelas.model.js";
import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataKelas = await Kelas.findAll({
            include: [
                {
                    model: Guru,
                    attributes: [ "name"],
                },
            ]
        });
        console.log(dataKelas)

        const data = dataKelas.map((Kelas) => {
            return {
                ...Kelas.dataValues,
                id: hashids.encode(Kelas.id),
            };
        });

        responses.res200("Berhasil mengambil data kelas", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID kelas tidak valid", res);
        const dataKelas = await Kelas.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataKelas.dataValues,
            id: hashids.encode(dataKelas.id),
            id_wali_kelas: hashids.encode(dataKelas.id_wali_kelas),
        };
        
        responses.res200("Berhasil mengambil data Kelas", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { tingkat, kode, id_wali_kelas, tahun } = req.body;
        const waliKelas = checkValidId(id_wali_kelas);
        if(!waliKelas) return responses.res400("ID wali kelas tidak valid", res);

        const dataKelas = await Kelas.findOne({
            where: {tingkat, kode, tahun}
        })
        if(dataKelas) return responses.res400("Maaf, data kelas sudah ada", res);

        await Kelas.create({tingkat, kode, id_wali_kelas: waliKelas, tahun});
        responses.res201("Kelas baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const { tingkat, kode, id_wali_kelas, tahun, isActive } = req.body;
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID kelas tidak valid", res);
        
        const waliKelas = checkValidId(id_wali_kelas);
        if(!waliKelas) return responses.res400("ID wali kelas tidak valid", res);

        const respons = await Kelas.update({
            tingkat, kode, id_wali_kelas: waliKelas, tahun, isActive
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, kelas tidak ditemukan", res);
        responses.res200("Data kelas berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID kelas tidak valid", res);
        
        const respons = await Kelas.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, kelas tidak ditemukan", res);
        responses.res200("Data kelas berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

