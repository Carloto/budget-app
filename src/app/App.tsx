import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts';
import { DashboardPage } from './pages';
import LoginPage from './pages/LoginPage';
import { getUser, User } from './services';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setUser(await getUser());
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  if (user) {
    return (
      <AuthContext.Provider value={{ user, onLogout: () => setUser(null) }}>
        <Routes>
          <Route path='/' element={<Navigate to='/2020-06' />}></Route>
          <Route path='/:date' element={<DashboardPage />} />
        </Routes>
      </AuthContext.Provider>
    );
  }

  return <LoginPage onSignIn={(user) => setUser(user)} />;
}

export default App;
