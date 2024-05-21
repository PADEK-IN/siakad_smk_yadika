import Guru from "../../../../models/guru.model.js";
import Mata_Pelajaran from "../../../../models/mata_pelajaran.model.js";
import Kelas from "../../../../models/kelas.model.js";
import Jadwal_Pelajaran from "../../../../models/jadwal_pelajaran.model.js";
import { checkValidId, hashids } from "../../../../helpers/isValidId.js";

// user
export const getUserPage = (req, res) => {
  res.render('pages/admin/user/index.ejs');
};
export const addUserPage = (req, res) => {
  res.render('pages/admin/user/add.ejs');
};

export const editUserPage = (req, res) => {
  res.render('pages/admin/user/edit.ejs');
};


// student
export const getStudentPage = (req, res) => {
  res.render('pages/admin/user/students.ejs');
};

export const detailStudentPage = (req, res) => {
  res.render('pages/admin/user/student-detail.ejs');
};

export const editStudentPage = (req, res) => {
  res.render('pages/admin/user/student-edit.ejs');
};

// teacher
export const getTeacherPage = async(req, res) => {
  try {
    const dataGuru = await Guru.findAll();

    const guru = dataGuru.map((guru) => {
        return {
          ...guru.dataValues,
          id: hashids.encode(guru.id)
        };
      });

    res.render('pages/admin/user/teachers.ejs', {guru});
} catch (err) {
    console.log(err.message);
    res.render("pages/errors/500");
}

};

export const addTeacherPage = async (req, res) => {
  try {
    const {  } = req.body;
    const validId = checkValidId(id);
    if(!validId) return res.render("pages/errors/400", { message: "ID guru tidak valid" });
    
    res.render('pages/admin/user/teacher-detail.ejs', { guru });
  } catch (err) {
    console.log(err.message);
    res.render("pages/errors/500");

  }
};

export const detailTeacherPage = async (req, res) => {
  try {
    const {id} = req.params;
    const validId = checkValidId(id);
    if(!validId) return res.render("pages/errors/400", { message: "ID guru tidak valid" });
    const dataGuru = await Guru.findOne({
        where: { id: validId },
    });

    // const jadwal = await Jadwal_Pelajaran.findAll({
    //   where: { id_mata_pelajaran: dataGuru.id_mata_pelajaran },
    //   include: [
    //     { model: Mata_Pelajaran},
    //     { model: Kelas,
    //       include:  [{
    //         model: Guru
    //       }]
    //     },
    //   ]
    // })

    const guru = {
        ...dataGuru.dataValues,
        id: hashids.encode(dataGuru.id),
    };
    
    res.render('pages/admin/user/teacher-detail.ejs', { guru });
  } catch (err) {
    console.log(err.message);
    res.render("pages/errors/500");

  }
};

export const editTeacherPage = (req, res) => {
  res.render('pages/admin/user/teacher-edit.ejs');
};
