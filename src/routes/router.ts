import express, { Request, Response } from 'express';
import course from '../api/course-management'
import video from '../api/video-management';
import comment from '../api/comment';
import user from '../api/user';
import review from '../api/review';
import auth from '../api/auth';

const router = express.Router();
router.get('/health',
    (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', code: 200, message: 'Welcome to the API' });
});

router.use('/courses', course.routes);
router.use('/auth', auth.routes);
router.use('/videos', video.routes);
router.use('/comments', comment.routes);
router.use('/users', user.routes);
router.use('/reviews', review.routes);

export const allRoutes = router;
