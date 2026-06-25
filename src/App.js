import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PageShell from './components/PageShell';

import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Seats from './pages/Seats';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AddMovie from './pages/AddMovie';
import CreateShow from './pages/CreateShow';
import ManageMovies from './pages/ManageMovies';
import ManageShows from './pages/ManageShows';
import EditMovie from './pages/EditMovie';
import ManageUsers from './pages/ManageUsers';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path="/" element={<Navigate to="/movies" replace />} />

          <Route
            path="/login"
            element={
              <PageShell className="px-6 py-10">
                <Login />
              </PageShell>
            }
          />

          <Route
            path="/register"
            element={
              <PageShell className="px-6 py-10">
                <Register />
              </PageShell>
            }
          />
          <Route
  path="/forgot-password"
  element={
    <PageShell className="px-6 py-10">
      <ForgotPassword />
    </PageShell>
  }
/>

<Route
  path="/reset-password/:token"
  element={
    <PageShell className="px-6 py-10">
      <ResetPassword />
    </PageShell>
  }
/>

          <Route
            path="/movies"
            element={
              <PageShell className="px-6 py-8">
                <Movies />
              </PageShell>
            }
          />

          <Route
            path="/shows/:movieId"
            element={
              <PageShell className="px-6 py-8">
                <Shows />
              </PageShell>
            }
          />

          <Route
            path="/seats/:showId"
            element={
              <PageShell className="px-6 py-8">
                <Seats />
              </PageShell>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <PrivateRoute>
                <PageShell className="px-6 py-8">
                  <MyBookings />
                </PageShell>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <AdminDashboard />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-movie"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <AddMovie />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/create-show"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <CreateShow />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/manage-movies"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <ManageMovies />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/manage-shows"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <ManageShows />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/edit-movie/:id"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <EditMovie />
                </PageShell>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <PageShell className="px-6 py-8">
                  <ManageUsers />
                </PageShell>
              </AdminRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;