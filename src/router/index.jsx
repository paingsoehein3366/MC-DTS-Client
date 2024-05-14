import DoctorCreateRoute from '@/features/doctor/routes/doctor-create-route';
import DoctorListRoute from '@/features/doctor/routes/doctor-lists-route';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
      return (
            <Routes>
                  <Route path='/' element={<DoctorCreateRoute />} />
                  <Route path='/doctor-list' element={<DoctorListRoute />} />
            </Routes>
      )
};
export default Router;