import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js'
import { subscribe, unsubscribe, sendWebPush } from '../controllers/webpush.controller.js';


const router = Router();

router.post('/webpush/subscribe', authRequire, subscribe);
router.post('/webpush/unsubscribe', authRequire, unsubscribe);
router.post('/webpush/send', authRequire, sendWebPush);


export default router;