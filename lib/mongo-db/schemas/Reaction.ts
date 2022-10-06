import { Schema } from 'mongoose';
import { serverConfig } from '@config/server-config';
import { buildCollectionName } from '@lib/mongo-db/utils';
import { getConnection } from '../connections';

const ObjectId = Schema.Types.ObjectId;

/**
 * @see https://vighnesh153.quip.com/h9SSADs1XLUN/Reactions-and-Comments
 */
export const ReactionSchema = new Schema({
  reactionId: { type: ObjectId, auto: true, required: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  reactionType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export async function getReactionModel() {
  const connection = await getConnection();
  const collectionName = buildCollectionName(serverConfig.mongoDB.collectionNames.reactions);
  return connection.model(collectionName, ReactionSchema);
}
