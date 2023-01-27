import React from 'react';
import { Link } from 'react-router-dom';
import { BackgroundDiv, WhiteBoardDiv,
  LogoTriviaGameDiv, RankingP, ListDiv,
  Items, HomeButton } from './StyledComponents/Ranking';

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
          style={ {
            width: '35%',
          } }
        >
          <HomeButton
            type="button"
          >
            Home
          </HomeButton>
        </Link>
      </BackgroundDiv>
    );
  }
}

export default Ranking;
