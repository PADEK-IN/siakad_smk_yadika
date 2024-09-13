import * as responses from "../../../../helpers/response.js";
import Murid from "../../../../models/murid.model.js";
import Users from "../../../../models/users.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

export const getAll = async (req, res) => {
    try {
        const dataMurid = await Murid.findAll();

        const data = dataMurid.map((murid) => {
            return {
              ...murid.dataValues,
              id: hashids.encode(murid.id),
              id_jurusan: hashids.encode(murid.id_jurusan),
              id_kelas: hashids.encode(murid.id_kelas),
            };
          });

        responses.res200("Berhasil mengambil data murid", data, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
}

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

export const create = async (req, res) => {
    try {
        const {
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, no_hp, sekolah_asal, tahun_masuk, id_jurusan, id_kelas, status
        } = JSON.parse(req.body.data);
       
        const idJurusan = checkValidId(id_jurusan);
        if(!idJurusan) return responses.res400("ID jurusan tidak valid", res);
        const idKelas = checkValidId(id_kelas);
        if(!idKelas) return responses.res400("ID kelas tidak valid", res);
        
        const foto = req.file?.filename;

        const dataMurid = await Murid.findOne({
            where: {nis, email}
        })
        if(dataMurid) return responses.res400("Maaf, data murid sudah ada", res);

        await Murid.create({
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, no_hp, sekolah_asal, tahun_masuk, 
            id_jurusan: idJurusan, id_kelas: idKelas, foto, status
        });

        await Users.update({isValid: true},{where: {email}});

        responses.res201("Murid baru berhasil ditambahkan", null, res);
    } catch (err) {
        console.log(err.message);
        responses.res500(res);
    }
};

export const update = async (req, res) => {
    try {
        const {
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin, agama,
            no_hp, sekolah_asal, tahun_masuk, id_jurusan, id_kelas, status
        } = JSON.parse(req.body.data);
        const {id} = req.params;

        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID murid tidak valid", res);
        const idJurusan = checkValidId(id_jurusan);
        if(!idJurusan) return responses.res400("ID jurusan tidak valid", res);
        const idKelas = checkValidId(id_kelas);
        if(!idKelas) return responses.res400("ID kelas tidak valid", res);
        
        const foto = req.file?.filename;

        const respons = await Murid.update({
            nis, email, nama, tempat_lahir, tanggal_lahir, alamat, jenis_kelamin,
            agama, no_hp, sekolah_asal, tahun_masuk, 
            id_jurusan: idJurusan, id_kelas: idKelas, foto, status
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

export const del = async (req, res) => {
    try {
        const {id} = req.params;
        const validId = checkValidId(id);
        if(!validId) return responses.res400("ID murid tidak valid", res);
        
        const murid = await Murid.findOne({
            where: { id: validId },
        });

        if(!murid) return responses.res400("Maaf, data murid tidak ditemukan", res);

        const email = murid.email;

        await Murid.destroy({
            where: {id: validId}
        });

        await Users.destroy({
            where: {email}
        });

        responses.res200("Data murid berhasil hapus", null, res);
    } catch (err) {
        console.log(err);
        responses.res500(res);
    }
}

