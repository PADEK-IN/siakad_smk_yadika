import Murid from "../../../../models/murid.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getNilaiPage = async(req, res) => {
    try {
    res.render("pages/murid/nilai/index");
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }

};
