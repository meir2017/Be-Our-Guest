let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let invitationSchema = new mongoose.Schema({
    title: String,
    text: String,
    attachments: [String]
});

let Invitation = mongoose.model('invitation', invitationSchema);

module.exports = Invitation;
