import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default:'user' },
  addresses: { type: [mongoose.Schema.Types.Mixed] }, 
  name: { type: String },
  passwordChangeToken:{
    type:String,
    default:''
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  orders: { type: [mongoose.Schema.Types.Mixed] }
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const User = mongoose.model('user', userSchema);
export default User;