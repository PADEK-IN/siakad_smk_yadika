export const getPaymentPage = (req, res) => {
    res.render("pages/admin/payment/index.ejs");
  };
  
export const addPaymentPage = (req, res) => {
    res.render("pages/admin/payment/add.ejs");
  };
  

export const detailPaymentPage = (req, res) => {
    res.render("pages/admin/payment/detail.ejs");
  };
  