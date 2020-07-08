const { Router } = require("express");

const send_mail = require("../controladores/send_mailCRUD");

const router = Router();

router.post("/send_mail", send_mail.sendMail);

module.exports = router;
