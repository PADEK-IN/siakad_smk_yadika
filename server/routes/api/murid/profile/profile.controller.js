import * as responses from "../../../../helpers/response.js";
import Murid from "../../../../models/murid.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getOneById = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID murid tidak valid", res);
        const dataMurid = await Murid.findOne({
            where: { id: validId },
        });

        const data = {
            ...dataMurid.dataValues,
            id: hashids.encode(dataMurid.id),
            id_jurusan: hashids.encode(dataMurid.id_jurusan),
            id_kelas: hashids.encode(dataMurid.id_kelas),
        };
        
        responses.res200("Berhasil mengambil data murid", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

export const update = async (req, res) => {
    try {
        const {
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin, agama,
            hobi, no_hp, sekolah_asal, no_ijazah, tahun_masuk, id_jurusan, id_kelas, isActive
        } = req.body;
        const {id} = req.params;

        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID murid tidak valid", res);
        const idJurusan = checkValidId(id_jurusan);
        if(!idJurusan) return responses.res400("ID jurusan tidak valid", res);
        const idKelas = checkValidId(id_kelas);
        if(!idKelas) return responses.res400("ID kelas tidak valid", res);
        
        const foto = req.file.filename;

        const respons = await Murid.update({
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, hobi, no_hp, sekolah_asal, no_ijazah, tahun_masuk, 
            id_jurusan: idJurusan, id_kelas: idKelas, foto, isActive
        },{
            where: {
                id: validId
            }
        });
        
        if(!respons[0]) return responses.res400("Maaf, data murid tidak ditemukan", res);
        responses.res200("Data murid berhasil diperbarui", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}