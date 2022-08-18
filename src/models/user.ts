import mongoose from 'mongoose';

// An interface that describes the properties that are required to create a new User
// Helps TS understand properties on User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a UserDocument has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// This is how to add a function to a model in typescript
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };