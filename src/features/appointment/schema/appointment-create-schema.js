import * as yup from 'yup';

export const createAppointmentSchema = yup.object().shape({
      gender: yup.string().required('Gender is required!'),
      slot: yup.string().required('Time is required!'),
      phone_number: yup.string().required('Phone is required!'),
      email: yup.string().email('invalid email!').required('Email is required!'),
      doctor: yup.string().required('Doctor is required!'),
      username: yup.string().required("Patient Name is requried!"),
});

export const createAppointmentValidate = (data) => {
      return createAppointmentSchema.validate(data).catch(err => {
            const message = err.errors;
            const key = err.path;
            return { message, key }
      });
};