import express, { Request, Response } from 'express';
import course from '../api/course-management'
const router = express.Router();
import auth from '../api/auth';

router.get('/health',
    (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', code: 200, message: 'Welcome to the API' });
});

router.use('/course', course.routes);
router.use('/auth', auth.routes);
export const allRoutes = router;
