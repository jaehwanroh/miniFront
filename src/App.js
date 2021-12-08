// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import './styles/css/dx/dx.style.css'
// import logo from './logo.svg';
import React, {Component} from 'react';
import Home from './view/home/Home';
import './App.css';

class App extends Component{

  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <Home />
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.gyigyi6666
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
