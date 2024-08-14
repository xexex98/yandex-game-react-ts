import { Box } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../../../../store';
import { EmojiTypeArray } from '../../../../store/modules/reactions/reactionsSlice';
import Reaction from '../Reaction';

import styles from './reactionsList.module.css';

type Props = {
  reactions?: EmojiTypeArray;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

const ReactionsList: React.FC<Props> = ({
  reactions,
  onClick,
  onMouseEnter,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const setActiveHandler = (userId?: number, reacted?: number[]) => {
    if (!userId || !reacted) {
      return false;
    }
    return reacted.filter((id) => id === userId).length ? true : false;
  };

  return (
    <Box
      component='div'
      display='flex'
      flexDirection='row'
      alignItems='center'
      flexWrap='nowrap'
      columnGap={'10px'}
      onMouseEnter={onMouseEnter}
    >
      <img
        className={styles.firstIcon}
        onClick={onClick}
        width={24}
        height={24}
        src='https://img.icons8.com/emoji/48/white-heart.png'
      />
      {reactions?.length
        ? reactions.map((reaction) => (
            <Reaction
              reaction={reaction}
              active={setActiveHandler(user?.id, reaction.reacted)}
              key={reaction.id}
            />
          ))
        : null}
    </Box>
  );
};

export default ReactionsList;
