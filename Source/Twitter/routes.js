

const { Router } = require("express")
const validInfo = require("../../middleware/validInfo")
const controller = require("./controller")
const auth = require("../../middleware/authorization")


const router = Router()

router.get("/", validInfo, controller.getAllAccounts)
router.get("/user", validInfo, controller.getUserByUsername)
router.post("/", validInfo, controller.signUpUser)
router.post('/login',validInfo, controller.loginUser) 
router.post("/follow", auth, controller.follow)
router.put("/following", validInfo, controller.following) 
router.get("/getfollowers", validInfo, controller.getfollowers)
router.get("/getfollowing", validInfo, controller.getfollowing)

 
module.exports = router;