import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@hbofficial/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [body('email').isEmail().withMessage('Email must be valid!')],
  [
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // Create a new user
    try {
      const user = User.build({ email, password });
      await user.save();

      // Generate a JWT
      const userJWT = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJWT,
      };

      return res.status(201).send(user);
    } catch (err) {
      console.log(err);
    }
  }
);

export { router as signupRouter };
