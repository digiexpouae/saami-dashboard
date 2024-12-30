import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import DefaultLayout from './layout/DefaultLayout';
import Warehouse from './pages/Warehouse/Warehouse';
import Employee from '@pages/Employee/Employee';
import { useDispatch } from 'react-redux';
import { createWarehouse } from './sliceApi/warehouseApi.js';
import { AppDispatch } from '@redux/store.js';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const createNewWarehouse = async () => {
      try {
        const body = { name: 'mansab' };
        await dispatch(createWarehouse(body));
      } catch (error) {
        console.error('Error creating warehouse:', error);
      } finally {
        setLoading(false);
      }
    };
    createNewWarehouse();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public Routes - No DefaultLayout */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <SignIn />}
      />

      {/* Protected Routes - Wrapped with DefaultLayout */}
      <Route
        path="*"
        element={
          <DefaultLayout>
            <Routes>
              <Route
                path="/warehouse"
                element={
                  <>
                    <PageTitle title="Warehouse | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Warehouse />
                  </>
                }
              />
              <Route
                path="/employee"
                element={
                  <>
                    <PageTitle title="Employee | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Employee />
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <PageTitle title="ECommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <ECommerce />
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormElements />
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormLayout />
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Tables />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Chart />
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Alerts />
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Buttons />
                  </>
                }
              />
            </Routes>
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
