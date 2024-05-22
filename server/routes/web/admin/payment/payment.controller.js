import Spp from '../../../../models/spp.model.js';
import Guru from "../../../../models/guru.model.js";
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
    console.log({spp});
    res.render("pages/admin/payment/index.ejs", { spp });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }};
  
export const addPaymentPage = (req, res) => {
    res.render("pages/admin/payment/add.ejs");
  };
  

export const editPaymentPage = (req, res) => {
    res.render("pages/admin/payment/edit.ejs");
  };

  // Transaction
export const getTransactionPage = (req, res) => {
    res.render("pages/admin/payment/transactions.ejs");
  };

export const acceptTransactionPage = (req, res) => {
    res.render("pages/admin/payment/transaction-request.ejs");
  };
  