import { Request } from 'express-serve-static-core';
import { Response } from 'express';

import { Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('pong');
});

export const pingController: Router = router;
