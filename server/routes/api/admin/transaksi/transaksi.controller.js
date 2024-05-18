import * as responses from "../../../../helpers/response.js";
import Transaksi from "../../../../models/transaksi.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataTransaksi = await Transaksi.findAll();

        const data = dataTransaksi.map((Transaksi) => {
            return {
              ...Transaksi.dataValues,
              id: hashids.encode(Transaksi.id),
              id_murid: hashids.encode(Transaksi.id_murid),
              id_spp: hashids.encode(Transaksi.id_spp)
            };
        });

        responses.res200("Berhasil mengambil data transaksi", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);
        const dataTransaksi = await Transaksi.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataTransaksi.dataValues,
            id: hashids.encode(dataTransaksi.id),
            id_murid: hashids.encode(Transaksi.id_murid),
            id_spp: hashids.encode(Transaksi.id_spp)
        };
        
        responses.res200("Berhasil mengambil data transaksi", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const create = async (req, res) => {
    try {
        const { id_spp, id_murid, bayar, tanggal_bayar } = req.body;

        const validIdSpp = checkValidId(id_spp);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);

        const validIdMurid = checkValidId(id_murid);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);

        const bayarInt = parseFloat(bayar);
        const bukti_bayar = "bukti.jpg"; // nanti ganti dari req.file kalau sudah ada multer
        
        const dataTransaksi = await Transaksi.findOne({
            where: {validIdSpp, validIdMurid, bayar: bayarInt, tanggal_bayar, bukti_bayar}
        });
        if(dataTransaksi) return responses.res400(`Maaf, tagihan dengan data tersebut sudah ada dengan ID ${hashids.encode(dataTransaksi.id)}`, res);
        
        await Transaksi.create({id_spp, id_murid, bayar: bayarInt, tanggal_bayar, bukti_bayar});
        responses.res201("Transaksi baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);

        const { id_spp, id_murid, bayar, tanggal_bayar } = req.body;

        const validIdSpp = checkValidId(id_spp);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);

        const validIdMurid = checkValidId(id_murid);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);

        const bayarInt = parseFloat(bayar);
        const bukti_bayar = "bukti.jpg"; // nanti ganti dari req.file kalau sudah ada multer

        const dataTransaksi = await Transaksi.findOne({
            where: { validIdSpp, validIdMurid, bayar: bayarInt, tanggal_bayar, bukti_bayar, idPaid: 0 }
        });
        if(dataTransaksi) return responses.res400(`Maaf, tagihan dengan data tersebut sudah ada dengan ID ${hashids.encode(dataTransaksi.id)}`, res);

        const respons = await Transaksi.update({
            validIdSpp, validIdMurid, bayar: bayarInt, tanggal_bayar, bukti_bayar, isPaid: 1
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, data transaksi tidak ditemukan", res);
        responses.res200("Data transaksi berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID Transaksi tidak valid", res);
        
        const respons = await Transaksi.destroy({
            where: {id: validId}
        });
       
        if(!respons) return responses.res400("Maaf, Transaksi tidak ditemukan", res);
        responses.res200("Data Transaksi berhasil hapus", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}