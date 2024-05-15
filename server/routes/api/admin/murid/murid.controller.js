import * as responses from "../../../../helpers/response.js";
import Murid from "../../../../models/murid.model.js";
import { hash } from "../../../../helpers/hashing.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataMurid = await Murid.findAll();

        const data = dataMurid.map((murid) => {
            return {
              ...murid.dataValues,
              id: hashids.encode(murid.id)
            };
          });

        responses.res200("Berhasil mengambil data murid", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        const dataMurid = await Murid.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataMurid.dataValues,
            id: hashids.encode(dataMurid.id),
        };
        
        responses.res200("Berhasil mengambil data murid", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {

        responses.res201("User baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const { email, role, isValid } = req.body;
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        
        const respons = await Murid.update({
            email, role, isValid,
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, user tidak ditemukan", res);
        responses.res200("Murid berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID user tidak valid", res);
        
        const respons = await Murid.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, murid tidak ditemukan", res);
        responses.res200("Murid berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

