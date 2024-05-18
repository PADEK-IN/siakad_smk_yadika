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
