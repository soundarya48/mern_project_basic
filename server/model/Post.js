import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
