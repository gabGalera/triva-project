import React from "react";
// import { connect } from "react-redux";

class Header extends React.Component {
  render () {
    const ranking = localStorage.getItem('ranking')
    const name = localStorage.getItem('name')
    const score = localStorage.getItem('score')
    const url = ranking[0]
    return(
      <div>
        <img
        src={ url }
        alt={ name }
        data-testid="header-profile-picture"
        />
        <h2
        data-testid="header-player-name"
        >{ name }
        </h2>
        <h3
        data-testid="header-score"
        >
        { score }
        </h3>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
  
// }

// export default connect(mapStateToProps)(Header);
export default Header;
