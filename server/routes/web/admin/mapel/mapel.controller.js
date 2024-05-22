import Mata_Pelajaran from '../../../../models/mata_pelajaran.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getMapelPage = async (req, res) => {
  try {
    const dataMapel = await Mata_Pelajaran.findAll();
    const mapel = dataMapel.map((mapel) => {
      return {
        ...mapel.dataValues,
        id: hashids.encode(mapel.id),
      };
    });
    res.render('pages/admin/mapel/index.ejs', { mapel });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};

export const addMapelPage = (req, res) => {
  res.render('pages/admin/mapel/add.ejs');
};

export const editMapelPage = async (req, res) => {
  try {
    const parts = req.url.split('/');
    let mapelId = parts[parts.length - 2];

    const decodedMapelId = hashids.decode(mapelId);
    const dataMapel = await Mata_Pelajaran.findOne({
      where: { id: decodedMapelId },
    });
    // console.log({ dataMapel });

    const mapel = {
      ...dataMapel.dataValues,
      id: hashids.encode(dataMapel.id),
    };

    res.render('pages/admin/mapel/edit.ejs', { mapel });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};
