import { Box, Pagination, Typography } from '@mui/material';
import { useState } from 'react';

type ListTopicProps<T> = {
  list: T[];
  children: (item: T) => JSX.Element;
  maxLength: number;
  changePage: (page: number) => void;
};

export const ListForum = <T,>({
  list,
  maxLength,
  children,
  changePage,
}: ListTopicProps<T>) => {
  const [countPage] = useState(Math.ceil(maxLength / 10));
  const [, setCurrentPage] = useState(1);

  const changeCurantPage = (_event: unknown, page: number) => {
    setCurrentPage(page);
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
          return children(card);
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
