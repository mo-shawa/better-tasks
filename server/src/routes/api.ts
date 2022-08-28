import express from "express"
import apiCtrl from "../controllers/api"

const router: express.Router = express.Router()

router.get('/test', apiCtrl.test)



export default router 