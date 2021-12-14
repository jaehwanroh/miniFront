// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import './styles/css/dx/dx.style.css'
// import logo from './logo.svg';
import React, {Component} from 'react';
import Home from './view/home/Home';
import DevGrid from './view/grid/DevGrid';
import SenchaGrid from './view/grid/SenchaGrid';
import WijmoGrid from './view/grid/WijmoGrid';
import DevTree from './view/tree/DevTree';
import DevCalGrid from './view/cal/DevCalGrid';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class App extends Component{

  // constructor(){
  //   super()
  // }

  render(){
    return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/DevGrid" element={<DevGrid/>} />
            <Route path="/SenchaGrid" element={<SenchaGrid/>} />
            <Route path="/WijmoGrid" element={<WijmoGrid/>} />
            <Route path="/DevTree" element={<DevTree/>} />
            <Route path="/DevCalGrid" element={<DevCalGrid/>} />
          </Routes>
        </BrowserRouter>
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
