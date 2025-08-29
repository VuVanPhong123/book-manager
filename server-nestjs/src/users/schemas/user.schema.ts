import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Tạo interface cho User document
export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: 'other' })
  gender: string;

  @Prop()
  age: number;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  socialId: string;

  // Method to compare password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    console.log('🔵 [USER SCHEMA] Comparing passwords...');
  console.log('🔵 [USER SCHEMA] Candidate password:', candidatePassword);
  console.log('🔵 [USER SCHEMA] Stored hashed password:', this.password);
  
  try {
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('🔵 [USER SCHEMA] Password comparison result:', result);
    return result;
  } catch (error) {
    console.error('🔴 [USER SCHEMA] Compare error:', error);
    return false;
  }
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre('save', async function(next) {
  console.log('🔵 [USER SCHEMA] Pre-save hook called');
  console.log('🔵 [USER SCHEMA] Password modified:', this.isModified('password'));
  console.log('🔵 [USER SCHEMA] Original password:', this.password);
  
  if (!this.isModified('password')) {
    console.log('🔵 [USER SCHEMA] Password not modified, skipping hash');
    return next();
  }
  
  try {
    console.log('🔵 [USER SCHEMA] Hashing password...');
    this.password = await bcrypt.hash(this.password, 12);
    console.log('🔵 [USER SCHEMA] Hashed password:', this.password);
    next();
  } catch (error) {
    console.error('🔴 [USER SCHEMA] Hash error:', error);
    next(error as Error);
  }
});

// Remove password when converting to JSON
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};