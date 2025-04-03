import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validationResult } from 'express-validator';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Signup request received:', req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, email, password, name } = req.body;
      console.log('Creating user with:', { username, email, name });

      const { user, verificationToken } = await this.authService.signup({
        username,
        email,
        password,
        name,
      });

      console.log('User created successfully:', user._id);

      res.status(201).json({
        message: 'User created successfully. Please verify your email.',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
        verificationToken,
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      res.status(400).json({ 
        message: error.message,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      const { user, accessToken } = await this.authService.login(
        email,
        password
      );

      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
        accessToken,
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
} 