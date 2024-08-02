import { API_URL, APPLICATION_JSON } from '../consts';

const TEAM_NAME = 'Ludocoders';
const ratingFieldName = 'rating';

export type RatingType = {
  login: string;
  rating: number;
};

export const getAllLeaderboardTeam = async (): Promise<
  Array<{ data: RatingType }>
> => {
  const body = {
    ratingFieldName,
    cursor: 0,
    limit: 13,
  };

  const response = await fetch(`${API_URL}/leaderboard/${TEAM_NAME}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: APPLICATION_JSON,
  });

  return (await response.json()) as Array<{ data: RatingType }>;
};

export const setRatingTeam = async (data: RatingType) => {
  return await fetch(`${API_URL}/leaderboard`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      data,
      ratingFieldName: ratingFieldName,
      teamName: TEAM_NAME,
    }),
    headers: APPLICATION_JSON,
  });
};
