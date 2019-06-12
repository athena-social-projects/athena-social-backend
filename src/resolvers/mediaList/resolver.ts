import {User} from '../../entity/User';

export default async (user: User) => {
  return (await User.findOne({where: {id: user.id}, relations: ['lists']})).lists;
};
