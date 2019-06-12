import {SchemaDirectiveVisitor} from 'graphql-tools';
import {defaultFieldResolver} from 'graphql';
import {MediaList} from '../../entity/MediaList';

const formatMediaLists = (lists: MediaList[]) => {
  lists.forEach((list: MediaList) => {
    // Add data where it is expected rather than creating a whole new object.
    list.items = list.items.map((item: any) => {
      item.id = item.media.id;
      item.title = item.media.title;
      item.type = item.media.type;
      return item;
    });
  });
  return lists;
};

export class TransformLists extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    const {resolve = defaultFieldResolver} = field;
    field.resolve = async (...args: any) => {
      return formatMediaLists(await resolve.apply(this, args));
    };
  }
}
