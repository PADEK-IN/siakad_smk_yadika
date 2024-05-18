export const isAuth = (req,res,next)=>{
  if(!req.session.user){
    console.log("Unauthorized user");
    res.redirect("/login");
    return
  }
  next();
}

export const isAuthLogin = (req,res,next)=>{
  if(req.session.user){
    console.log("Unauthorized user");
    if(req.session.user.role == "admin") return res.redirect("/admin/dashboard");
    if(req.session.user.role == "guru") return res.redirect("/teacher/dashboard");
    if(req.session.user.role == "murid") return res.redirect("/murid/dashboard");
  }
  next();
}

export const isUser = (req,res,next)=>{
  if(req.session.user.role == "admin") return res.redirect("/admin/dashboard");
  if(req.session.user.role == "guru") return res.redirect("/teacher/dashboard");
  if(req.session.user.role == "murid") return res.redirect("/murid/dashboard");
  next();
}