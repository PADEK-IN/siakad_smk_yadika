import * as responses from "../../../../helpers/response.js";
import Jadwal_Absen from "../../../../models/jadwal_absen.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataJadwalAbsen = await Jadwal_Absen.findAll();

        const data = dataJadwalAbsen.map((jadwalAbsen) => {
            return {
              ...jadwalAbsen.dataValues,
              id: hashids.encode(jadwalAbsen.id),
              id_kelas: hashids.encode(jadwalAbsen.id_kelas),
              id_mata_pelajaran: hashids.encode(jadwalAbsen.id_mata_pelajaran)
            };
          });

        responses.res200("Berhasil mengambil data jadwal absen", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jadwal absen tidak valid", res);
        const dataJadwalAbsen = await Jadwal_Absen.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataJadwalAbsen.dataValues,
            id: hashids.encode(dataJadwalAbsen.id),
            id_kelas: hashids.encode(dataJadwalAbsen.id_kelas),
            id_mata_pelajaran: hashids.encode(dataJadwalAbsen.id_mata_pelajaran)
        };
        
        responses.res200("Berhasil mengambil data jadwal absen", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { tanggal, waktu_buka, waktu_tutup, id_kelas, id_mata_pelajaran } = req.body;
        const validIdKelas = checkValidId(id_kelas);
        if(!validIdKelas) return responses.res400("ID kelas tidak valid", res);
        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

        await Jadwal_Absen.create({ tanggal, waktu_buka, waktu_tutup, id_kelas:validIdKelas, id_mata_pelajaran:validIdMaPel });
        responses.res201("Data jadwal absen baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jadwal absen tidak valid", res);

        const { tanggal, waktu_buka, waktu_tutup, id_kelas, id_mata_pelajaran, isUse } = req.body;
        const validIdKelas = checkValidId(id_kelas);
        if(!validIdKelas) return responses.res400("ID kelas tidak valid", res);
        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);
        
        const respons = await Jadwal_Absen.update({
            tanggal, waktu_buka, waktu_tutup, id_kelas:validIdKelas, id_mata_pelajaran:validIdMaPel, isUse
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, jadwal absen tidak ditemukan", res);
        responses.res200("Data jadwal absen berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jadwal absen tidak valid", res);
        
        const respons = await Jadwal_Absen.destroy({
            where: {id: validId}
        });
        
        if(!respons) return responses.res400("Maaf, jadwal absen tidak ditemukan", res);
        responses.res200("Data jadwal absen berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

