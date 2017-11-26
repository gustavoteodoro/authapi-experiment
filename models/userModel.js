var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefones: [{
        _id: false,
        numero: Number,
        ddd: Number
    }],
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao:  { type: Date, default: Date.now },
    ultimo_login: Date,
});

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;