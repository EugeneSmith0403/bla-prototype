const express = require('express');
const multer = require('multer')
const router = express.Router();
const userController = require('./../controller/user')
const checkerAuth  = require('./../../middleware/check-auth')
const checkerPermission = require('./../../middleware/check-permissions')

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(new Error("error uploaded"), true)
  }else {
      cb(new Error("error uploaded"), false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5,
    fileFilter: fileFilter
}})


router.post('/signUp', userController.signUp)
router.post('/loginIn', userController.logIn)
router.post('/:userId', checkerAuth, checkerPermission, upload.single('image'), userController.updateUser)
router.get('/', userController.getAllUser)
router.delete('/:userId', checkerAuth, checkerPermission, userController.deleteUser)

module.exports = router;
