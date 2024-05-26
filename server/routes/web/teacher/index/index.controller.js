import Guru from "../../../../models/guru.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getIndexPage = (req, res) => {
    res.render("pages/teacher/index");
};

export const getProfilePage = async(req, res) => {
    try {
         // const  email  = req.session.user.email;
        const  email  = "guru@gmail.com";
        const dataGuru = await Guru.findOne({
            where: { email },
            raw: true
        })  
        // console.log(dataGuru);
        const guru = {
            ...dataGuru,
            id: hashids.encode(dataGuru.id),
        }
        console.log({ guru });
        res.render("pages/teacher/profile/index", { guru });
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};
