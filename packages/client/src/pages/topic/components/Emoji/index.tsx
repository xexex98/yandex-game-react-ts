import React, { MouseEventHandler } from 'react';

import { EmojiType } from '../../../../store/modules/reactions/reactionsSlice';

import styles from './emoji.module.css';

type Props = {
  emoji: EmojiType;
  onClick?: MouseEventHandler;
};

const Emoji: React.FC<Props> = ({ emoji, onClick }) => {
  return (
    <div
      className={styles.emojiContainer}
      onClick={onClick}
    >
      <img
        className={styles.emoji}
        src={emoji.path}
        alt={'emoji_' + emoji.id}
      />
    </div>
  );
};

export default Emoji;
