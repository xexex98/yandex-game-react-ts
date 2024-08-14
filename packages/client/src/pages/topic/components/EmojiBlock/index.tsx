import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  EmojiTypeArray,
  getEmojiList,
} from '../../../../store/modules/reactions/reactionsSlice';
import { EmojiList } from '../EmojiList';
import ReactionsList from '../ReactionsList';

type Props = {
  reactionsList?: EmojiTypeArray;
  commentId?: number;
};

export const EmojiBlock: React.FC<Props> = ({
  reactionsList,
  commentId,
}: Props) => {
  const [show, setShow] = useState(false);
  const { emojiList, status } = useAppSelector((state) => state.reaction);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getEmojiList());
    }
  }, [status, dispatch]);

  const showEmojiList = () => {
    setShow(true);
  };

  const hideEmojiList = () => {
    setShow(false);
  };

  return (
    <Box
      component={'div'}
      position={'relative'}
      onMouseEnter={showEmojiList}
      onMouseLeave={hideEmojiList}
    >
      <Box
        position={'absolute'}
        left={0}
        top={'-40px'}
      >
        <EmojiList
          emojiList={emojiList}
          isLoading={status === 'loading'}
          isError={status === 'failed'}
          show={show}
          commentId={commentId}
        />
      </Box>
      <ReactionsList reactions={reactionsList} />
    </Box>
  );
};
