import mongoose from 'mongoose';

export interface UserDTO {
    googleId: String, 
    email: String,
    name: String,
    historicalDailyGoals: [number, Date, Date][]
}

export interface UserLoginDTO {
  googleId: string;
  email: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  historicalDailyGoals: {
    type: [[Number]], 
    validate: {
      validator: (arr) =>
        arr.every(inner => Array.isArray(inner) && inner.length === 3 && inner.every(n => typeof n === 'number')),
      message: 'Each entry in historicalDailyGoals must be an array of 3 numbers',
    },
  currentDailyGaols: {
    type: Number,
    required: true,
  },
    default: [],
  },
}, {
  timestamps: true, 
});

export default mongoose.model('User', userSchema);
