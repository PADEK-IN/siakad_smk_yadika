import Murid from "../../../../models/murid.model.js";
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getIndexPage = async(req, res) => {
    try {
    // const  email  = req.session.user.email;
    const  email  = "user@gmail.com";
    const dataMurid = await Murid.findOne({
        where: { email },
        raw: true
    })  
    // console.log({dataMurid});
    const murid = {
        ...dataMurid,
        id: hashids.encode(dataMurid.id),
    }
    console.log({ murid });

    res.render("pages/murid/index");
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};

export const getProfilePage = async(req, res) => {
    try {
        // const  email  = req.session.user.email;
        const  email  = "user@gmail.com";
        const dataMurid = await Murid.findOne({
            where: { email },
            raw: true
        })
        // console.log({dataMurid});
        const murid = {
            ...dataMurid,
            id: hashids.encode(dataMurid.id),
        }
        console.log({ murid });

        res.render("pages/murid/profile/index");
    } catch (err) {
        console.log(err.message);
        res.render('pages/errors/500');
    }
};
