import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/admin");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' }
});

const User = mongoose.model('User', userSchema);
export default User;
