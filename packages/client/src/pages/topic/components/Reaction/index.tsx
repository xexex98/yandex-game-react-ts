import { Box } from '@mui/material';
import React from 'react';

import { EmojiType } from '../../../../store/modules/reactions/reactionsSlice';

import styles from './reaction.module.css';

type Props = {
  reaction: EmojiType;
  active: boolean;
};

const Reaction: React.FC<Props> = ({ reaction, active }: Props) => {
  return reaction.count ? (
    <Box
      component={'div'}
      display='flex'
      flexDirection='row'
      alignItems='center'
      flexWrap='nowrap'
      columnGap='5px'
      padding={'3px'}
      borderRadius={'4px'}
      sx={{
        backgroundColor: active ? '#ddd' : 'inherit',
      }}
    >
      <img
        className={styles.reaction_img}
        src={reaction.path}
        alt={'emoji_' + reaction.id}
      />{' '}
      <p>{reaction.count}</p>
    </Box>
  ) : null;
};

export default Reaction;
