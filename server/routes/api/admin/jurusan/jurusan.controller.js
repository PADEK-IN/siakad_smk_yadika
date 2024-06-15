import * as responses from "../../../../helpers/response.js";
import Jurusan from "../../../../models/jurusan.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataJurusan = await Jurusan.findAll();

        const data = dataJurusan.map((jurusan) => {
            return {
              ...jurusan.dataValues,
              id: hashids.encode(jurusan.id)
            };
          });

        responses.res200("Berhasil mengambil data jurusan", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jurusan tidak valid", res);
        const dataJurusan = await Jurusan.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataJurusan.dataValues,
            id: hashids.encode(dataJurusan.id),
        };
        
        responses.res200("Berhasil mengambil data Jurusan", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { nama } = req.body;
        await Jurusan.create({nama});
        responses.res201("Jurusan baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const { nama } = req.body;
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jurusan tidak valid", res);
        
        const respons = await Jurusan.update({
            nama,
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, jurusan tidak ditemukan", res);
        responses.res200("Jurusan berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID jurusan tidak valid", res);
        
        const respons = await Jurusan.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, jurusan tidak ditemukan", res);
        responses.res200("Jurusan berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

