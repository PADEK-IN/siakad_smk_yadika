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