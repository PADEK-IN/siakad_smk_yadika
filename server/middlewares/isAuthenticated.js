// // Simple example of code using authentication/authorization with sessions
// export const auth = (req,res,next)=>{
//     if(!req.session.user){
//       // let err = new Error("Anda belum login !");
//       console.log("Unauthorized")
//       res.redirect("/login")
//       return
//     }
//     next()
//   }
  
// export const authLogin = (req,res,next)=>{
//     if(req.session.user){
//       console.log("Unauthorized")
//       res.redirect("/")
//       return
//     }
//     next()
//   }
