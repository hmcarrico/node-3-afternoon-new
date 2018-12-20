module.exports = (req, res, next) => {
    if(!req.session.user){
        session.user = {username:'', cart:[], total: 0 };
      }
      next();
}