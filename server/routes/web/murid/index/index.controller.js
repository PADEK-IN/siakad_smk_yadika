import Murid from "../../../../models/murid.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';
import Jurusan from "../../../../models/jurusan.model.js";
import Kelas from "../../../../models/kelas.model.js";

export const getIndexPage = async(req, res) => {
    try {
        res.render("pages/murid/index");
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};

export const getProfilePage = async(req, res) => {
    try {
        const  email  = req.session.user.email;
        const dataMurid = await Murid.findOne({
            where: { email },
            include: [{
                model: Jurusan,
                attributes: ['nama']
            },{
                model: Kelas,
                attributes: ['tingkat', 'kode']
            }]
        })
        const murid = {
            ...dataMurid.dataValues,
            id: hashids.encode(dataMurid.id),
            id_jurusan: hashids.encode(dataMurid.id_jurusan),
            id_kelas: dataMurid.id_kelas?hashids.encode(dataMurid.id):null,
        }
        res.render("pages/murid/profile/index", { murid });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};