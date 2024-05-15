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
export const getTeacherPage = (req, res) => {
  res.render('pages/admin/user/teachers.ejs');
};

export const detailTeacherPage = (req, res) => {
  res.render('pages/admin/user/teacher-detail.ejs');
};

export const editTeacherPage = (req, res) => {
  res.render('pages/admin/user/teacher-edit.ejs');
};
