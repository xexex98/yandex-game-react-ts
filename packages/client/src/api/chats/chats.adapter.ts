import { ChatsEntity } from './chats.entity';
import { ChatsSource } from './chats.source';

export const getChatsAdapter = (chats: ChatsSource): ChatsEntity => {
  return chats.reduce((acc, item) => {
    acc.push({
      id: item.id,
      title: item.title,
      shortDescription: item.last_message ? item.last_message.content : '',
      date: item.last_message ? item.last_message.time : '',
    });

    return acc;
  }, [] as ChatsEntity);
};
