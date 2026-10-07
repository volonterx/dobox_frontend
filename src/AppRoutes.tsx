import { Routes, Route } from 'react-router';
import { TodoPage, LoginPage, ItemPage } from './pages'
import AppLayout from '@/AppLayout'
import RequireAuth from '@/auth/RequireAuth'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
      <Route path="/login" element={<LoginPage/>}/>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<TodoPage/>}/>
          <Route path="/items/:id" element={<ItemPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
}