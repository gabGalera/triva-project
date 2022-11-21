import React from 'react';
import { Link } from 'react-router-dom';
import background from '../images/background.png';
import trivia from '../images/trivia.png';

class Ranking extends React.Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // funçao tirada do site https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958#:~:text=We%20can%20use%20.,%3Eb%2Da)%20for%20descending%20order.
    // const reverseSortedRanking = sortedRanking.reverse();
    const whiteBoardHeight = 67.4;
    const liHeight = 9.22;
    const halfMargin = 8;
    return (
      <div
        style={ {
          position: 'absolute',
          height: `${100 + (liHeight + halfMargin) * [ranking.length - 1]}%`,
          width: '100%',
          background: `url(${background})`,
          backgroundSize: 'contain',
        } }
      >
        <img
          src={ trivia }
          alt="trivia logo"
          style={ {
            position: 'absolute',
            width: '13.89%', // 177.79 / 1280
            height: 'auto',
            left: '43.06%',
            top: '5%',

            zIndex: '1',
          } }
        />
        <div
          id="whiteBoard"
          style={ {
            position: 'absolute',
            width: '38.20%', // 489 / 1280
            height: `${whiteBoardHeight + liHeight}%`, // 488 / 724
            left: '30.94%', // 396 / 1280
            top: '20.44%', // 148 / 724

            background: '#FFFFFF',
            boxShadow: '1px 4px 13px 2px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          } }
        >
          <p
            data-testid="ranking-title"
            style={ {
              position: 'absolute',
              width: '71.98%', // 352 / 489
              height: '9.22%', // 45 / 488
              left: '38.25%', // 464 / 1280
              top: '15.57%', // tentativa e erro

              fontFamily: 'Epilogue',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '30px',
              lineHeight: '150%',
              /* identical to box height, or 45px */

              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',

              color: '#3C1B7A',
            } }
          >
            Ranking
          </p>
          <ul
            style={ {
              position: 'absolute',
              width: '67.89%',
              left: '12.27%', // 447 / 1280
              // height: `${9.22 + 9.22 * [ranking.length - 1]}%`,
              top: '30%',
              listStyle: 'none',
            } }
          >
            {ranking.map(((player, index) => (
              <li
                key={ player.name }
                style={ {
                  // position: 'absolute',
                  // width: '67.89%', // 332 / 489
                  height: '9.22%', // 55 / 488
                  margin: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',

                  background: '#EBEBEB',
                  borderRadius: '100px',
                } }
              >
                <img
                  src={ player.picture }
                  alt={ `${player.name} profile` }
                  style={ {
                    borderRadius: '100px',
                  } }
                />
                <span
                  data-testid={ `player-name-${index}` }
                  style={ {
                    position: 'absolute',
                    // width: '184px',
                    // height: '24px',
                    left: '27%',
                    // top: '25%',

                    fontFamily: 'Epilogue',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '22px',
                    lineHeight: '150%',
                    /* identical to box height, or 24px */

                    display: 'flex',
                    alignItems: 'center',

                    color: '#000000',
                  } }
                >
                  { player.name }
                </span>
                <span
                  data-testid={ `player-score-${index}` }
                  style={ {
                    position: 'absolute',
                    // width: '184px',
                    // height: '24px',
                    left: '70%',
                    // top: '25%',

                    fontFamily: 'Epilogue',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '22px',
                    lineHeight: '150%',
                    /* identical to box height, or 24px */

                    display: 'flex',
                    alignItems: 'center',

                    color: '#000000',
                  } }
                >
                  { player.score }
                </span>
              </li>
            )
            ))}
          </ul>
          <Link
            to="/"
          >
            <button
              type="button"
              data-testid="btn-go-home"
              style={ {
                position: 'absolute',
                width: '78.94%', // 389 / 489
                height: '45px',
                left: '10.50%',
                top: '88%',

                background: '#2FC18C',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
              } }
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Ranking;
