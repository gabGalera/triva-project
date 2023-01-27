import React from 'react';
import { Link } from 'react-router-dom';
import { BackgroundDiv, WhiteBoardDiv,
  LogoTriviaGameDiv, RankingP, ListDiv, Items } from './StyledComponents/Ranking';

class Ranking extends React.Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <BackgroundDiv>
        <LogoTriviaGameDiv />
        <WhiteBoardDiv>
          <RankingP>
            Ranking
          </RankingP>
          <ListDiv>
            {ranking.map(((player, index) => (
              <Items
                key={ player.name }
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
              </Items>
            )
            ))}
          </ListDiv>
        </WhiteBoardDiv>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="btn-go-home"
            style={ {
              // position: 'absolute',
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
      </BackgroundDiv>
    );
  }
}

export default Ranking;
