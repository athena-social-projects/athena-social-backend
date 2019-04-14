import {User} from '../../entity/User';
import {MediaList} from '../../entity/MediaList';


const formatMediaLists = (lists: MediaList[]) => {
  const formattedLists: any = [];
  lists.forEach((list: MediaList) => {
    const formattedList: any = list;
    formattedList.items = formattedList.items.map((item: any) => {
      item.id = item.media.id;
      item.title = item.media.title;
      item.type = item.media.type;
      return item;
    });
    formattedLists.push(formattedList);
  });
  return formattedLists;
};
export default async (user: User) => {
  const lists = (await User.findOne({where: {id: user.id}, relations: ['lists']})).lists;
  return formatMediaLists(lists);
};
