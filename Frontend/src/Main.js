import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

// import { connect } from 'react-redux';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/* <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} /> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;
// const mapStateToProps = (state) => {
//     // console.log(state);

//     return {
//         loggedIn: state.loggedIn,
//         user_type: state.user_type
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // counterIncrement: (counter) => dispatch(counterIncrement(counter))
//         // logout: (loggedIn) => dispatch(logout(loggedIn)),

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
