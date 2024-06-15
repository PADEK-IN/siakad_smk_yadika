import Spp from '../../../../models/spp.model.js';
import Murid from '../../../../models/murid.model.js';
import Transaksi from '../../../../models/transaksi.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getPaymentPage = async(req, res) => {
  try {
    const dataSpp = await Spp.findAll();
    const spp = dataSpp.map((spp) => {
      return {
        ...spp.dataValues,
        id: hashids.encode(spp.id),
      };
    });
    res.render("pages/admin/payment/index.ejs", { spp });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};
  
export const addPaymentPage = (req, res) => {
    res.render("pages/admin/payment/add.ejs");
  };
  
export const editPaymentPage = async(req, res) => {
  try {
    const parts = req.url.split('/');
    let mapelId = parts[parts.length - 2];

    const decodedMapelId = hashids.decode(mapelId);
    const dataSpp = await Spp.findOne({
      where: { id: decodedMapelId },
    })

    const spp = {
      ...dataSpp.dataValues,
      id: hashids.encode(dataSpp.id),
      periode: Number(dataSpp.bulan) > 9 ? dataSpp.tahun+"-"+dataSpp.bulan : dataSpp.tahun+"-0"+dataSpp.bulan
    };

    res.render("pages/admin/payment/edit.ejs", { spp });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
  };

  // Transaction
export const getTransactionPage = async (req, res) => {
  try {
    const dataTransaksi = await Transaksi.findAll({
      include: [
        {
            model: Spp,
        },
        {
            model: Murid,
            attributes: ["nama"]
        }
      ]
    });

    const data = dataTransaksi.map((Transaksi) => {
        return {
          ...Transaksi.dataValues,
          id: hashids.encode(Transaksi.id),
          id_murid: hashids.encode(Transaksi.id_murid),
          id_spp: hashids.encode(Transaksi.id_spp)
        };
    });
    
    res.render("pages/admin/payment/transactions.ejs", {data});
  } catch (err) {
      console.log(err.message);
      res.render("pages/errors/500.ejs");
  }
};

export const acceptTransactionPage = async (req, res) => {
  try {
    const { id } = req.params;
    const validId = checkValidId(id);
    const dataTransaksi = await Transaksi.findOne({
      where: {id: validId},
      include: [{
        model: Murid,
        attributes: ["nama"]

      },{
        model: Spp
      }],
    })

    const data = dataTransaksi.map((Transaksi) => {
      return {
        ...Transaksi.dataValues,
        id: hashids.encode(Transaksi.id),
        id_murid: hashids.encode(Transaksi.id_murid),
        id_spp: hashids.encode(Transaksi.id_spp)
      };
    });

    res.render("pages/admin/payment/transaction-request.ejs", {data});
  } catch (error) {
    console.log(error.message);
    res.render("pages/errors/500.ejs");
  }
};
  