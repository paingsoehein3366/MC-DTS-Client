import * as yup from 'yup';

export const updateDoctorSchema = yup.object().shape({
      specialist: yup.string().required('Specialist is required!'),
      gender: yup.string().required('Gender is required!'),
      experiences: yup.string().required('Experiences is required!'),
      email: yup.string().email('invalid email!').required('Email is required!'),
      name: yup.string().required("Name is requried!"),
});