import { checkValidId, hashids } from "../../../../helpers/isValidId.js";
import moneyFormat from "../../../../helpers/moneyFormatter.js";
import { periodeFormat } from "../../../../helpers/periodeFormatter.js";
import Kelas from "../../../../models/kelas.model.js";
import Murid from "../../../../models/murid.model.js";
import Spp from "../../../../models/spp.model.js";
import Transaksi from "../../../../models/transaksi.model.js";

export const getPaymentPage = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const id_murid = 1;
        const murid = await Murid.findOne({
            where: {id: id_murid},
            attributes: ["nama"],
            include: [{
                model: Kelas,
                attributes: ["tingkat", "kode"],
            }],
        })

        const spp = await Spp.findAll({
            where: {tahun: currentYear, tingkat: murid.Kela.tingkat},
            order: [["bulan", "DESC"], ["tahun", "DESC"]]
        });
        const dataTransaksi = await Transaksi.findAll({
            where: {id_murid},
            include: [{
                model: Murid,
                attributes: ["nama"]
            }],
        })

        const data = spp.map(sppItem => {
            let transaksi = dataTransaksi.find(item => item.id_spp == sppItem.id);
            if(transaksi?.dataValues){
                transaksi["id"] = hashids.encode(transaksi.id);
                transaksi["id_spp"] = hashids.encode(transaksi.id_spp);
                transaksi["id_murid"] = hashids.encode(transaksi.id_murid);
            } else {
                transaksi = false;
            }
            return {
                ...sppItem.toJSON(),
                id: hashids.encode(sppItem.id),
                periode: periodeFormat(sppItem.bulan, sppItem.tahun),
                tagihan: moneyFormat('Rp', sppItem.tagihan),
                transaksi: transaksi
            };
        });
        res.render("pages/murid/payment/index", {data, murid});
    } catch (error) {
        console.log(error.message);
        res.render("pages/errors/500.ejs");
    }
};

export const historyPayment = async (req, res) => {
    try {
        const id_murid = 1;
        const dataTransaksi = await Transaksi.findAll({
            where: {id_murid},
            include: [
            {
                model: Murid,
                attributes: ["nama"]
            },
            {
                model: Spp
            }],
            order: [["tanggal_bayar", "DESC"]]
        })

        const data = dataTransaksi.map((detailTransaksi) => {
            return {
              ...detailTransaksi.dataValues,
              id: hashids.encode(detailTransaksi.id),
              periode: periodeFormat(detailTransaksi.Spp.bulan, detailTransaksi.Spp.tahun),
              id_murid: hashids.encode(detailTransaksi.id_murid),
              id_spp: hashids.encode(detailTransaksi.id_spp),
            };
        });

        res.render("pages/murid/payment/history", {data});
    } catch (error) {
        console.log(error.message);
        res.render("pages/errors/500.ejs")
    }
};
