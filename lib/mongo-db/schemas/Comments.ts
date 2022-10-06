import { Schema } from 'mongoose';
import { serverConfig } from '@config/server-config';
import { buildCollectionName } from '@lib/mongo-db/utils';
import { getConnection } from '../connections';

const ObjectId = Schema.Types.ObjectId;

/**
 * @see https://vighnesh153.quip.com/h9SSADs1XLUN/Reactions-and-Comments
 */
export const CommentSchema = new Schema({
  commentId: { type: ObjectId, auto: true, required: true },
  authorId: { type: String, required: true },
  postId: { type: String, required: true },
  isReplyToAnotherComment: { type: Boolean, required: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export async function getCommentModel() {
  const connection = await getConnection();
  const collectionName = buildCollectionName(serverConfig.mongoDB.collectionNames.comments);
  return connection.model(collectionName, CommentSchema);
}
