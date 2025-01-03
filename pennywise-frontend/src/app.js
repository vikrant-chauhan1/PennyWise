import React from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SummaryPage from "./pages/SummaryPage";
import ExpensesPage from './pages/ExpensesPage'; 
import EarningsPage from './pages/EarningsPage'; 

const isAuthorized =true;


function App() {
    return (
       <div>
         
         {!isAuthorized ? (
          <Login />
         ) : (
          <Router>
            <Navbar />
            <Routes>
                
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route path="/earnings" element={<EarningsPage />} />
            </Routes>
         </Router>
         
            
        )};
            

            

      </div>
    );
}

export default App;
