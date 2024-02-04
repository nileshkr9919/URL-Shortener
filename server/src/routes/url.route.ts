import { Router } from 'express'
import { URLController } from '../controllers';

const router = Router();

router.get('/:shortKey', URLController.redirectToOriginalURL);
router.post('/', URLController.shortenURL);

export { router };
