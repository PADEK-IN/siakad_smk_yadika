import * as responses from "../../../../helpers/response.js";
import Penilaian from "../../../../models/penilaian.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataPenilaian = await Penilaian.findAll();

        const data = dataPenilaian.map((Penilaian) => {
            return {
              ...Penilaian.dataValues,
              id: hashids.encode(Penilaian.id),
              id_murid: hashids.encode(dataPenilaian.id_murid),
              id_mata_pelajaran: hashids.encode(dataPenilaian.id_mata_pelajaran),
            };
        });

        responses.res200("Berhasil mengambil data penilaian", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID penilaian tidak valid", res);
        const dataPenilaian = await Penilaian.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataPenilaian.dataValues,
            id: hashids.encode(dataPenilaian.id),
            id_murid: hashids.encode(dataPenilaian.id_murid),
            id_mata_pelajaran: hashids.encode(dataPenilaian.id_mata_pelajaran),
        };
        
        responses.res200("Berhasil mengambil data penilaian", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { id_murid, id_mata_pelajaran, tugas, uts, uas, tambahan, akhir, semester } = req.body;

        const validIdMurid = checkValidId(id_murid);
        if(!validIdMurid) return responses.res400("ID murid tidak valid", res);

        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

        const nilaiTugas = parseFloat(tugas);
        const nilaiUts = parseFloat(uts);
        const nilaiUas = parseFloat(uas);
        const nilaiTambahan = parseFloat(tambahan);
        const nilaiAkhir = parseFloat(akhir);

        await Penilaian.create({
            id_murid: validIdMurid, 
            id_mata_pelajaran: validIdMaPel, 
            tugas: nilaiTugas, 
            uts: nilaiUts, 
            uas: nilaiUas, 
            tambahan: nilaiTambahan, 
            akhir: nilaiAkhir, 
            semester
        });
        responses.res201("Data penilaian baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID Penilaian tidak valid", res);

        const { id_murid, id_mata_pelajaran, tugas, uts, uas, tambahan, akhir, semester } = req.body;

        const validIdMurid = checkValidId(id_murid);
        if(!validIdMurid) return responses.res400("ID murid tidak valid", res);

        const validIdMaPel = checkValidId(id_mata_pelajaran);
        if(!validIdMaPel) return responses.res400("ID mata pelajaran tidak valid", res);

        const nilaiTugas = parseFloat(tugas);
        const nilaiUts = parseFloat(uts);
        const nilaiUas = parseFloat(uas);
        const nilaiTambahan = parseFloat(tambahan);
        const nilaiAkhir = parseFloat(akhir);

        const respons = await Penilaian.update({
            id_murid: validIdMurid, 
            id_mata_pelajaran: validIdMaPel, 
            tugas: nilaiTugas, 
            uts: nilaiUts, 
            uas: nilaiUas, 
            tambahan: nilaiTambahan, 
            akhir: nilaiAkhir, 
            semester
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, data penilaian tidak ditemukan", res);
        responses.res200("Data penilaian berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID penilaian tidak valid", res);
        
        const respons = await Penilaian.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, penilaian tidak ditemukan", res);
        responses.res200("Data penilaian berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}