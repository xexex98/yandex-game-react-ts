export type ChatSource = {
  id: number;
  title: string;
  last_message: {
    time: Date;
    content: string;
  } | null;
};

export type ChatsSource = Array<ChatSource>;
