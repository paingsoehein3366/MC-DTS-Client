import DoctorCreateRoute from '@/features/doctor/routes/doctor-create-route';
import DoctorListRoute from '@/features/doctor/routes/doctor-lists-route';
import DoctorSlotRoute from '@/features/doctor/routes/doctor-slot-route';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
      return (
            <Routes>
                  <Route path='/' element={<DoctorCreateRoute />} />
                  <Route path='/doctor-list' element={<DoctorListRoute />} />
                  <Route path='/doctor-list/doctor-slot' element={<DoctorSlotRoute />} />
            </Routes>
      )
};
export default Router;