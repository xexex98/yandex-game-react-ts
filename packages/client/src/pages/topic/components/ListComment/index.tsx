import { useEffect, useState } from 'react';

import { ListForum } from '../../../../components/ListForum';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  CommentType,
  getComments,
} from '../../../../store/modules/coments/commentsSlice';
import { CommentCard } from '../CommentCard';

export const ListComment = () => {
  const dispatch = useAppDispatch();
  const { comments, status } = useAppSelector((state) => state.comments);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getComments());
    }
  });

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || !comments?.length) {
    return <div>Not found...</div>;
  }

  return (
    <>
      <ListForum
        list={comments.slice(10 * (currentPage - 1), 10 * currentPage)}
        changePage={changeCurrentPage}
        maxLength={comments.length}
      >
        {(card: CommentType) => (
          <CommentCard
            card={{ ...card }}
            key={card.id}
          />
        )}
      </ListForum>
    </>
  );
};
