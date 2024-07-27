import Murid from '../../../../models/murid.model.js';
import Penilaian from '../../../../models/penilaian.model.js';
import Mata_Pelajaran from '../../../../models/mata_pelajaran.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';

export const getNilaiPage = async (req, res) => {
  try {
    // const id_murid = 1;
    // console.log(req.session.user)
    const id_murid = req.session.user.id_murid;
    const dataNilai = await Penilaian.findAll({
      where: {
        id_murid: id_murid,
      },
      include: [
        {
          model: Mata_Pelajaran,
          attributes: ['nama','tingkat'],
        },
      ],
      raw: true,
    });
    // console.log(dataNilai);

    const nilai = dataNilai.map((data) => {
      return {
        ...data,
        id: hashids.encode(data.id),
        Mata_Pelajaran: {
          nama: data['Mata_Pelajaran.nama'] || 'Tidak ada mata pelajaran',
          tingkat: data['Mata_Pelajaran.tingkat'] || 'Tidak ada mata pelajaran',
        },
      };
    });

    res.render('pages/murid/nilai/index', { nilai });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};