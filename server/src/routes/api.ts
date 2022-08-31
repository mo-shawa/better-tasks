import express from 'express'
import api from '../controllers/api'
import apiCtrl from '../controllers/api'

const router: express.Router = express.Router()

router.get('/test', apiCtrl.test)
router.post('/tasks', apiCtrl.createTask)

export default router
