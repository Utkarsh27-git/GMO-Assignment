import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';
import { Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/second" element={<ProtectedRoute component={SecondPage} />} />
    </Routes>
  );
};

const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const user = localStorage.getItem('user');
  return user ? <Component /> : <Navigate to="/" replace />;
};

export default App;
