
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";


import Indexadd_data from './components/AddData/indexAddData';
import IndexUpdate from './components/UpdateData/IndexUpdate';
import IndexGetData from './components/GetData/IndexGetData';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/adddata" element={ 
             <Indexadd_data/> 
             }>
          </Route>

          <Route exact path="/updatedata" element={
           <IndexUpdate/>
          }>
          </Route>

          <Route exact path="/getdata" element={
            <IndexGetData/>
          }>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
