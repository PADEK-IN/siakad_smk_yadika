import Murid from '../../../../models/murid.model.js';
import Penilaian from '../../../../models/penilaian.model.js';
import Mata_Pelajaran from '../../../../models/mata_pelajaran.model.js';
import { checkValidId, hashids } from '../../../../helpers/isValidId.js';
import Kelas from '../../../../models/kelas.model.js';
import Guru from '../../../../models/guru.model.js';

export const getNilaiPage = async (req, res) => {
  try {
    // const id_murid = 1;
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

    const id_wali_kelas = await Murid.findOne({
      where: {
        id: id_murid,
      },
      include: [
        {
          model: Kelas,
          include: [
            {
              model: Guru,
              attributes: ['nama'],
            },
          ],
        },
      ],
      raw: true,
    });

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

    const wali_kelas = id_wali_kelas['Kela.Guru.nama'] || 'Tidak ada wali kelas';

    res.render('pages/murid/nilai/index', { nilai, wali_kelas });
  } catch (err) {
    console.log(err.message);
    res.render('pages/errors/500');
  }
};