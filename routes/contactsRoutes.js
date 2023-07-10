const express = require("express");

const router = express.Router();

const {
  geContactID,
  getContact,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactController");

const validateToken = require("../middleware/validateTokenHandling");

router.use(validateToken);
router.route("/").get(getContact).post(postContact);

router.route("/:id").get(geContactID).put(putContact).delete(deleteContact);

module.exports = router;
