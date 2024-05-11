export const getIndexPage = (req, res) => {
  res.render("pages/index");
};

export const loginPage = (req, res) => {
  res.render("pages/auth/login");
};

export const registerPage = (req, res) => {
  res.render("pages/auth/register");
};

export const dashboardAdminPage = (req, res) => {
  res.render("pages/admin/index");
};
