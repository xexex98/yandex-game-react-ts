import { Box, Pagination, Typography } from '@mui/material';
import { FC, useState } from 'react';

type ListTopicProps = {
  list: unknown[];
  maxLength: number;
  slot: (item: T) => JSX.Element;
  changePage: (page: number) => void;
};

export const ListForum: FC<ListTopicProps> = ({
  list,
  maxLength,
  slot,
  changePage,
}) => {
  const [countPage] = useState(Math.ceil(maxLength / 10));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_curranPage, setCurrantPage] = useState(1);

  const changeCurantPage = (_event: unknown, page: number) => {
    setCurrantPage(page);
    window.scrollTo(0, 0);
    changePage(page);
  };

  return (
    <Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {!list.length && <Typography>No Data</Typography>}
        {list.map((card) => {
          return slot(card);
        })}
      </Box>
      {countPage > 1 && (
        <Pagination
          count={countPage}
          shape='rounded'
          onChange={changeCurantPage}
          sx={{
            marginTop: 2.5,
          }}
        />
      )}
    </Box>
  );
};
