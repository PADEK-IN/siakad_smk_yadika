export const getUserPage = (req, res) => {
  res.render('pages/admin/user/index.ejs');
};
export const addUserPage = (req, res) => {
  res.render('pages/admin/user/add.ejs');
};

export const getStudentPage = (req, res) => {
  res.render('pages/admin/user/students.ejs');
};
export const addStudentPage = (req, res) => {
  res.render('pages/admin/user/student-add.ejs');
};

export const getTeacherPage = (req, res) => {
  res.render('pages/admin/user/teachers.ejs');
};
export const addTeacherPage = (req, res) => {
  res.render('pages/admin/user/teacher-add.ejs');
};
