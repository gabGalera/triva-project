import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // funçao tirada do site https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958#:~:text=We%20can%20use%20.,%3Eb%2Da)%20for%20descending%20order.
    // const reverseSortedRanking = sortedRanking.reverse();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
        <ul>
          {ranking.map(((player, index) => (
            <li
              key={ player.name }
            >
              <img
                src={ player.picture }
                alt={ `${player.name} profile` }
              />
              <span data-testid={ `player-name-${index}` } style={ { padding: '4x' } }>
                { player.name }
              </span>
              <span data-testid={ `player-score-${index}` }>
                { player.score }
              </span>
            </li>
          )
          ))}
        </ul>
      </div>
    );
  }
}

export default Ranking;
