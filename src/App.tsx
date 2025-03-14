import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Checkin from './pages/Checkin/Checkin.js';
import DefaultLayout from './layout/DefaultLayout';
import Warehouse from './pages/Warehouse/Warehouse';
import Employee from '@pages/Employee/Employee';
import EmployeeDetails from '@pages/Employee/EmployeeDetails.jsx';

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  // If token doesn't exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the children (protected routes)
  return children;
}

function App() {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.auth.token);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public Routes - Accessible without authentication */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes - Requires authentication */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <Routes>
                <Route
                  path="/warehouse"
                  element={
                    <>
                      <PageTitle title="Warehouse " />
                      <Warehouse />
                    </>
                  }
                />
                <Route
                  path="/employee"
                  element={
                    <>
                      <PageTitle title="Employee " />
                      <Employee />
                    </>
                  }
                />
                <Route
                  path="/employee/:employeeId"
                  element={
                    <>
                      <PageTitle title="Employee Details " />
                      <EmployeeDetails />
                    </>
                  }
                />
                <Route
                  index
                  element={
                    <>
                      <PageTitle title="ECommerce Dashboard " />
                      <ECommerce />
                    </>
                  }
                />






                <Route
                  path="/attendances"
                  element={
                    <>
                      <PageTitle title="Checkin " />
                      <Checkin />
                    </>
                  }
                />
              </Routes>
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
