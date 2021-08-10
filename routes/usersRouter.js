const express = require('express');
const userControler = require('./../controlers/usersControler');
const router = express.Router();

router.route('/').get(userControler.getAllUsers).post(userControler.addUser);

router
  .route('/:id')
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser)
  .get(userControler.getUser);

module.exports = router;
