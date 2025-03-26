const express = require("express");
const router = express.Router();
const apiUserController = require("../controllers/apiUserController");

router.post("/add-messages", apiUserController.addMessage);
router.get("/message", apiUserController.getMessages);
router.get("/test", apiUserController.test)

router.put("/edit-message-page/:id", apiUserController.editMessagePage);
router.put("/edit-message-form/:id", apiUserController.editMessageForm);
router.delete("/delete-message/:id", apiUserController.deleteMessage)
router.post("/add-comments/:id", apiUserController.addComments);


module.exports = router;