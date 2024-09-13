import { checkValidId } from "../../../../helpers/isValidId.js";
import * as responses from "../../../../helpers/response.js";
import Spp from "../../../../models/spp.model.js";
import Transaksi from "../../../../models/transaksi.model.js";

export const create = async (req, res) => {
  try {
    const {id_murid} = req.session.user;
    const {id} = req.params;
    const id_spp = checkValidId(id);
    if(!id_spp) return responses.res400("ID SPP tidak valid", res);
    
    if(!req.file.filename) return responses.res400("Maaf, tidak ada bukti pembayaran yang kamu upload", res);
    const foto = req.file.filename;
    const dataTransaksi = await Transaksi.findOne({
        where: {id_spp, id_murid},
        raw: true
    });

    if(dataTransaksi) {
        await Transaksi.update({bukti_bayar:foto}, {where: {id: dataTransaksi.id}})
    } else {
        const date = new Date();
        await Transaksi.create({id_spp, id_murid, tanggal_bayar: date, bukti_bayar: foto})
    }

    responses.res201("Bukti pembayaran berhasil diupload", null, res);
  } catch (err) {
      console.log(err.message);
      responses.res500(res);
  }
}