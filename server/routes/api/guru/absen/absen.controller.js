import * as responses from "../../../../helpers/response.js";
import Absen from "../../../../models/Absen.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const absen = await Absen.findAll();

        const data = absen.map((absen) => {
            return {
              ...absen.dataValues,
              id: hashids.encode(absen.id),
              id_murid: hashids.encode(absen.id_murid),
              id_jadwal_absen: hashids.encode(absen.id_jadwal_absen)
            };
          });

        responses.res200("Berhasil mengambil data absen", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID absen tidak valid", res);
        const absen = await Absen.findOne({
            where: { id: validId },
        });

        const data = {
            ...absen.dataValues,
            id: hashids.encode(absen.id),
            id_murid: hashids.encode(absen.id_murid),
            id_jadwal_absen: hashids.encode(absen.id_jadwal_absen)
        };
        
        responses.res200("Berhasil mengambil data absen", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { status, id_murid, id_jadwal_absen } = req.body;
        const validIdMurid = checkValidId(id_murid);
        if(!validIdMurid) return responses.res400("ID murid tidak valid", res);
        const validIdJadwalAbsen = checkValidId(id_jadwal_absen);
        if(!validIdJadwalAbsen) return responses.res400("ID jadwal absen tidak valid", res);

        await Absen.create({ status, id_murid:validIdMurid, id_jadwal_absen:validIdJadwalAbsen });
        responses.res201("Data absen baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID absen tidak valid", res);

        const { status } = req.body;
        
        const respons = await Absen.update({
            status
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, absen tidak ditemukan", res);
        responses.res200("Data absen berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}
