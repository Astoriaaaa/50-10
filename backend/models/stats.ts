import mongoose from 'mongoose';

export type SessionType = 'STUDY' | 'BREAK';

export interface StatDTO {
  user: string;             
  duration: number;         
  completed: number;        
  isCompleted?: boolean;    
  sessionType: SessionType; 
}

const StatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  completed: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: true,
  },
  sessionType: {
    type: String,
    enum: ['STUDY', 'BREAK'],
    default: 'focus',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Stat', StatSchema);
