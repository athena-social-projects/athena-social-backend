import { Request } from "express-serve-static-core";
import { Response } from "express";

const { Router } = require('express');

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

module.exports = router;
