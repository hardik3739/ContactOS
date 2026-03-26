import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import ContactsPage  from './pages/ContactsPage';
import TrashPage     from './pages/TrashPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/"         element={<ContactsPage />} />
      <Route path="/trash"    element={<TrashPage />} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  );
}
