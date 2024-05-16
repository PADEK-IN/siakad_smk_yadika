export const getPaymentPage = (req, res) => {
    res.render("pages/admin/payment/index.ejs");
  };
  
export const addPaymentPage = (req, res) => {
    res.render("pages/admin/payment/add.ejs");
  };
  

export const editPaymentPage = (req, res) => {
    res.render("pages/admin/payment/edit.ejs");
  };

  // Transaction
export const getTransactionPage = (req, res) => {
    res.render("pages/admin/payment/transactions.ejs");
  };

export const acceptTransactionPage = (req, res) => {
    res.render("pages/admin/payment/transaction-request.ejs");
  };
  