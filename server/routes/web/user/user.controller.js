export const getUserPage = (req, res) => {
  res.render('pages/admin/user/index.ejs');
};

export const addUserPage = (req, res) => {
  res.render('pages/admin/user/add.ejs');
};
