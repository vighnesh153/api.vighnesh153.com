import { serverConfig } from '@config/server-config';

export function constructMongoDBUrl(props: { user: string; password: string; clusterUrl: string }): string {
  const { user, password, clusterUrl } = props;
  return `mongodb+srv://${user}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;
}

export function buildCollectionName(baseName: string) {
  const { collectionsPrefix } = serverConfig.mongoDB;
  return `${baseName}${collectionsPrefix}`;
}
