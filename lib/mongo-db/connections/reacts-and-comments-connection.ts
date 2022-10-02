import * as mongoose from 'mongoose';
import { serverConfig } from '@config/server-config';
import { constructMongoDBUrl } from '../utils';

let mongooseConnection: mongoose.Connection | null = null;
const connectionUrl = constructMongoDBUrl(serverConfig.mongoDB.credentials.reactsAndComments);

export async function getReactsAndCommentsConnection(): Promise<mongoose.Connection> {
  if (mongooseConnection === null) {
    mongooseConnection = await mongoose.createConnection(connectionUrl);
  }
  return mongooseConnection;
}
