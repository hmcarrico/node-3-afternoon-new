const users = require('../models/users');
id = 1;

module.exports = {
    login: (req, res) => {
        const {session} = req;
        const {username, password} = req.body;
        const user = users.find(user => {
            user.username === username && user.password === password
        });
        if(user) {
          session.user.username = user.username;
          res.status(200).send(session.user);
        } else {
          res.status(500).send('Unauthorized.');
        }
    }, 
    register: (req, res) => {
        const { username, password } = req.body;
        users.push({ id, username, password });
        id++;
        req.session.user.username = req.body.username;
        res.status(200).send(req.session.user);
    }, 
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    }, 
    getUser: (req, res) => {
        res.status(200).send(req.session.user);
    }
  };