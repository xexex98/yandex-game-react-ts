import { Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  addReaction,
  AddReactionType,
} from '../../../../store/modules/coments/commentsSlice';
import { EmojiTypeArray } from '../../../../store/modules/reactions/reactionsSlice';
import Emoji from '../Emoji';

type Props = {
  emojiList: EmojiTypeArray;
  isLoading: boolean;
  isError: boolean;
  show?: boolean;
  commentId?: number;
};

export const EmojiList: React.FC<Props> = ({
  emojiList,
  isLoading,
  isError,
  show,
  commentId,
}: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handler = (params: AddReactionType) => {
    dispatch(addReaction(params));
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      rowGap={'10px'}
      width={'max-content'}
      maxWidth={'250px'}
      padding={'5px'}
      borderRadius={'4px'}
      sx={{
        background: '#fff',
      }}
      visibility={show ? 'visible' : 'hidden'}
    >
      {isLoading ? (
        <p style={{ padding: 0, margin: 0 }}>Loading...</p>
      ) : isError || emojiList?.length === 0 || !emojiList ? (
        <p style={{ padding: 0, margin: 0 }}>Not found...</p>
      ) : (
        emojiList?.map((emoji) => (
          <Emoji
            emoji={emoji}
            onClick={() =>
              handler({ reaction: emoji, commentId, userId: user?.id })
            }
            key={emoji.id}
          />
        ))
      )}
    </Box>
  );
};
