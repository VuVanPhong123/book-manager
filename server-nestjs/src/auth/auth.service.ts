import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema'; // <-- Import UserDocument
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>, // <-- Sử dụng UserDocument
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
  console.log(' [AUTH SERVICE] Register called with data:', registerDto);
  
  try {
    const { username, email, password, name, gender, age, phone, socialId } = registerDto;

    // Check if user exists
    const existingEmail = await this.userModel.findOne({ email }).exec();
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.userModel.findOne({ username }).exec();
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    console.log(' [AUTH SERVICE] Creating user WITHOUT manual hashing...');
    
    // Tạo user với password plain text - Mongoose hook sẽ tự hash
    const user = new this.userModel({
      username,
      email,
      password: password, // <-- GỬI PASSWORD PLAIN TEXT, Mongoose sẽ hash
      name: name || '',
      gender: gender || 'other',
      age: age || null,
      phone: phone || '',
      socialId: socialId || '',
    });

    console.log(' [AUTH SERVICE] Saving user (Mongoose will auto-hash)...');
    const savedUser = await user.save();

    console.log(' [AUTH SERVICE] User saved successfully');
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return {
      message: 'User created successfully',
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(' [AUTH SERVICE] Error in register:', error);
    if (error instanceof ConflictException) {
      throw error;
    }
    throw new InternalServerErrorException('Error creating user');
  }
}

  async login(loginDto: LoginDto) {
  console.log(' [AUTH SERVICE] Login called with:', loginDto);
  
  try {
    const { email, password } = loginDto;

    console.log(' [AUTH SERVICE] Finding user by email:', email);
    
    // Find user with password field
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    console.log(' [AUTH SERVICE] User found:', user ? 'YES' : 'NO');
    if (!user) {
      console.log(' [AUTH SERVICE] User not found for email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(' [AUTH SERVICE] Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(' [AUTH SERVICE] Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log(' [AUTH SERVICE] Invalid password for email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(' [AUTH SERVICE] Generating JWT token...');
    const payload = { 
      userId: user._id.toString(),
      username: user.username 
    };
    const token = this.jwtService.sign(payload);
    console.log(' [AUTH SERVICE] Token generated');

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    console.log(' [AUTH SERVICE] Login successful for user:', user._id);
    return {
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(' [AUTH SERVICE] Login error:', error);
    if (error instanceof UnauthorizedException) {
      throw error;
    }
    throw new InternalServerErrorException('Error during login');
  }
}
}