const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controlers/usersControler');

const {
  signup,
  login,
  logOut,
  forgetPassword,
  resetPassword,
  updatePassword,
  protected,
  restrictTo,
} = require('../controlers/authControler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logOut);
router.post('/forgetpassword', forgetPassword);
router.patch('/resetpassword/:token', resetPassword);

//This middleware runs before all the middleware below
router.use(protected);

router.get('/me', getMe, getUser);
router.patch('/updateme', uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/updatepassword', updatePassword);
router.delete('/deleteme', deleteMe);

//All the middleware under this middle are restircted to the admin only
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').patch(updateUser).delete(deleteUser).get(getUser);

module.exports = router;
