// index, show, store, update, destroy
/*
index => listagem
show => listar uma única
store => criar
update => alterar
destroy => remover
*/
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user =  await User.findOne({email});

        if(!user){//if not exists
            user = await User.create({ email });
        }

        return res.json(user);
    }
};