// Middleware untuk cek sudah login atau belum, untuk mencegah user yang belum login masuk
export const isAuth = (req,res,next)=>{
    if(!req.session.user){
      console.log("Unauthorized user")
      res.redirect("/login")
      return
    }
    next()
}

// Middleware untuk cek sudah login atau belum, tapi untuk mencegah user yang sudah login kembali ke halaman login
export const isAuthLogin = (req,res,next)=>{
    if(req.session.user){
      console.log("Unauthorized user")
      res.redirect("/")
      return
    }
    next()
}
