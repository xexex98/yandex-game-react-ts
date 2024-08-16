const leaderboard = {
  ratingFieldName: 'test',
  cursor: 0,
  limit: 100,
};

self.addEventListener('message', function (e) {
  // здесь можно делать и другие запросы (добавим в следующих спринтах по мере необходимости)
  // сюда же можно добавить сложные вычисления, которые будут выполнять в параллельном потоке
  if (e.data === 'start') {
    fetch(`https://ya-praktikum.tech/api/v2/leaderboard/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(leaderboard),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => postMessage(res))
      .catch((err) => console.error(err));
  }
});
