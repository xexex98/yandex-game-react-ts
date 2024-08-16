export type ChatEntity = {
  id: number;
  title: string;
  shortDescription: string;
  date: Date | string;
};
export type ChatsEntity = Array<ChatEntity>;
