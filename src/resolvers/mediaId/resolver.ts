export default function mediaId(obj: any, args: any, context: any) {
  const {id, mediaType} = args;
  return context.mediaClientManager.getClient(mediaType).getById(id);
}
