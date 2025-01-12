import React,{useContext} from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SummaryPage from "./pages/SummaryPage";
import ExpensesPage from './pages/ExpensesPage'; 
import EarningsPage from './pages/EarningsPage'; 
import { UserContext } from './UserContext';
import Register from './pages/Register';




function App() {
    const {user,loading} = useContext(UserContext);
    if(loading){
      return <p>Loading...</p>;
    }
    return (
      <Router>
        <div>
         
         {!user ? (
          
          
          <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />}/>
          </Routes>
          
          
          
         ) : (
          
           <>
              <Navbar />
              <Routes>
                <Route path="/" element={<SummaryPage />} />
                
                
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/earnings" element={<EarningsPage />} />
              </Routes>         
           
           </>
         
         
            
        )}
            

            

      </div>
      </Router>
       
    );
}

export default App;
