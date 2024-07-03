type UsefInfo = {
  login: string;
  rating: number;
  avatar?: string;
};

export type CardTop3UserProps = {
  position: number;
  card: UsefInfo;
};
