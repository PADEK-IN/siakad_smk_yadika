import * as responses from "../../../../helpers/response.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataMataPelajaran = await Mata_Pelajaran.findAll();

        const data = dataMataPelajaran.map((mataPelajaran) => {
            return {
              ...mataPelajaran.dataValues,
              id: hashids.encode(mataPelajaran.id)
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
        if(!validId) return responses.res400("ID Mata_Pelajaran tidak valid", res);
        const dataMataPelajaran = await Mata_Pelajaran.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataMataPelajaran.dataValues,
            id: hashids.encode(dataMataPelajaran.id),
        };
        
        responses.res200("Berhasil mengambil data Mata_Pelajaran", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { nama, tingkat } = req.body;
        const data = await Mata_Pelajaran.findOne({
            where: {nama, tingkat}
        })
        if(data) return responses.res400(`Maaf, data mata pelajaran ${nama} untuk kelas ${tingkat} sudah ada`, res);
        await Mata_Pelajaran.create({nama, tingkat});
        responses.res201("Mata pelajaran baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const { nama, tingkat, isUse } = req.body;
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID mata pelajaran tidak valid", res);
        
        const respons = await Mata_Pelajaran.update({
            nama, tingkat, isUse
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, mata pelajaran tidak ditemukan", res);
        responses.res200("Mata pelajaran berhasil diperbarui", null, res);
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
        
        const respons = await Mata_Pelajaran.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, mata pelajaran tidak ditemukan", res);
        responses.res200("Mata pelajaran berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

