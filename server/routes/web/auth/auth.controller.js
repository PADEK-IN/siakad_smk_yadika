export const getIndexPage = (req, res) => {
    res.render("pages/index");
  };
  
  export const loginPage = (req, res) => {
    res.render("pages/auth/login");
  };
  
  export const registerPage = (req, res) => {
    res.render("pages/auth/register");
  };
  
  
  export const registerMuridPage = (req, res) => {
    const {email} = req.query;
    res.render("pages/auth/form-murid", {email});
  };
  
  