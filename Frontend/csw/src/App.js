import logo from "./logo.svg";
import { React, Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import CardSection from "./components/cardsection/CardSection";
import FirstScreen from "./components/firstscreen/FirstScreen";
import SecondScreen from "./components/secondscreen/SecondScreen";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import SurvivorDetails from "./components/survivors/SurvivorDetails";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <FirstScreen />
            </Route>
            <Route exact path="/survivors">
              <Header />
              <SecondScreen />
            </Route>
            <Route exact path="/survivordetails/:survivorid">
              <Header />
              <SurvivorDetails />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

// export class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Router>
//           <Switch>
//             <Route exact path="#/">
//               <FirstScreen />
//             </Route>
//             <Route exact path="#/survivors">
//               <SecondScreen />
//             </Route>
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

export default App;
