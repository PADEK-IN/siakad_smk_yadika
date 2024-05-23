import * as responses from "../../../../helpers/response.js";
import Jadwal_Pelajaran from "../../../../models/jadwal_pelajaran.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataMataPelajaran = await Jadwal_Pelajaran.findAll();

        const data = dataMataPelajaran.map((mataPelajaran) => {
            return {
              ...mataPelajaran.dataValues,
              id: hashids.encode(mataPelajaran.id),
              id_kelas: hashids.encode(mataPelajaran.id_kelas),
              id_mata_pelajaran: hashids.encode(mataPelajaran.id_mata_pelajaran)
            };
          });

        responses.res200("Berhasil mengambil data mata pelajaran", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jadwal pelajaran tidak valid", res);
        const dataMataPelajaran = await Jadwal_Pelajaran.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataMataPelajaran.dataValues,
            id: hashids.encode(dataMataPelajaran.id),
            id_kelas: hashids.encode(dataMataPelajaran.id_kelas),
            id_mata_pelajaran: hashids.encode(dataMataPelajaran.id_mata_pelajaran)
        };
        
        responses.res200("Berhasil mengambil data jadwal pelajaran", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { hari, waktu_mulai, waktu_selesai, id_kelas, id_mata_pelajaran } = req.body;
        const validIdKelas = checkValidId(id_kelas);
        if(!validIdKelas) return responses.res400("ID kelas tidak valid", res);
        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

        await Jadwal_Pelajaran.create({ hari, waktu_mulai, waktu_selesai, id_kelas:validIdKelas, id_mata_pelajaran:validIdMaPel });
        responses.res201("Mata pelajaran baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID mata pelajaran tidak valid", res);

        const { hari, waktu_mulai, waktu_selesai, id_kelas, id_mata_pelajaran, isUse } = req.body;
        const validIdKelas = checkValidId(id_kelas);
        if(!validIdKelas) return responses.res400("ID kelas tidak valid", res);
        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);
        
        const respons = await Jadwal_Pelajaran.update({
            hari, waktu_mulai, waktu_selesai, id_kelas:validIdKelas, id_mata_pelajaran:validIdMaPel, isUse
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, mata pelajaran tidak ditemukan", res);
        responses.res200("Data mata pelajaran berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID mata pelajaran tidak valid", res);
        
        const respons = await Jadwal_Pelajaran.destroy({
            where: {id: validId}
        });
        
        if(!respons) return responses.res400("Maaf, mata pelajaran tidak ditemukan", res);
        responses.res200("Data mata pelajaran berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

