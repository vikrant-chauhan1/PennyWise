import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import SummaryPage from './pages/SummaryPage';
import ExpensesPage from './pages/ExpensesPage';
import EarningsPage from './pages/EarningsPage';

function App() {
  const { user, loading } = useContext(UserContext);
  

  if (loading) {
    return <p>Loading...</p>;
  }
  
  

  return (
    <BrowserRouter>
      <div>
        {/* If not logged in, show Login/Register */}
        {!user ? (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} /> {/* Default route when not logged in */}
          </Routes>
        ) : (
          <>
            {/* Navbar and main app pages when logged in */}
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
    </BrowserRouter>
  );
}

export default App;
