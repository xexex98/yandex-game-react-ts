import { Link } from '@mui/material';
import { useState } from 'react';

import { ListForum } from '../../../../components/ListForum';
import { TopicCard } from '../../../../components/TopicCard';

type Card = {
  id: number;
  title: string;
  shortDescription: string;
  date: Date;
};

export const ListTopic = () => {
  const topics: Card[] = [
    {
      id: 1,
      title: 'Title topic1',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 2,
      title: 'Title topic2',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 3,
      title: 'Title topic3',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 4,
      title: 'Title topic4',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 5,
      title: 'Title topic5',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 6,
      title: 'Title topic6',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 7,
      title: 'Title topic7',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 8,
      title: 'Title topic8',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 9,
      title: 'Title topic9',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 10,
      title: 'Title topic10',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 11,
      title: 'Title topic11',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 12,
      title: 'Title topic12',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 13,
      title: 'Title topic13',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 14,
      title: 'Title topic14',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 15,
      title: 'Title topic15',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 16,
      title: 'Title topic16',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 17,
      title: 'Title topic17',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 18,
      title: 'Title topic18',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 19,
      title: 'Title topic19',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 20,
      title: 'Title topic20',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 21,
      title: 'Title topic21',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 22,
      title: 'Title topic22',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 23,
      title: 'Title topic23',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 24,
      title: 'Title topic24',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 25,
      title: 'Title topic25',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 26,
      title: 'Title topic26',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 27,
      title: 'Title topic27',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 28,
      title: 'Title topic28',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 29,
      title: 'Title topic29',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 30,
      title: 'Title topic30',
      shortDescription: 'short description topick',
      date: new Date(),
    },
  ];

  const [currantPage, setCurrantPage] = useState(1);

  const changeCurantPage = (page: number) => {
    setCurrantPage(page);
  };

  const slotCard = (card: Card) => {
    return (
      <Link
        href={`/forum/topic/${card.id}`}
        key={card.id}
        sx={{
          width: '100%',
        }}
      >
        <TopicCard card={{ ...card, content: card.shortDescription }} />
      </Link>
    );
  };

  return (
    <ListForum
      list={topics.slice(10 * (currantPage - 1), 10 * currantPage)}
      slot={slotCard}
      changePage={changeCurantPage}
      maxLength={topics.length}
    />
  );
};
