import { useState } from 'react';

import { ListForum } from '../../../../components/ListForum';
import { TopicCard } from '../../../../components/TopicCard';

type Card = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  date: Date;
};

export const ListComment = () => {
  const comments: Card[] = [
    {
      id: 1,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 2,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 3,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 4,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 5,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 6,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 7,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 8,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 9,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 10,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 11,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 12,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
  ];

  const [currantPage, setCurrantPage] = useState(1);

  const changeCurantPage = (page: number) => {
    setCurrantPage(page);
  };

  return (
    <ListForum
      list={comments.slice(10 * (currantPage - 1), 10 * currantPage)}
      changePage={changeCurantPage}
      maxLength={comments.length}
    >
      {(card: Card) => (
        <TopicCard
          card={{ ...card, content: card.comment, title: card.name }}
          key={card.id}
        />
      )}
    </ListForum>
  );
};
