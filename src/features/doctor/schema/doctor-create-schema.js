import * as yup from 'yup';

export const createDoctorSchema = yup.object().shape({
      specialist: yup.string().required('Specialist is required!'),
      gender: yup.string().required('Gender is required!'),
      experiences: yup.string().required('Experiences is required!'),
      email: yup.string().email('invalid email!').required('Email is required!'),
      lastName: yup.string().required("lastName is requried!"),
      firstName: yup.string().required("firstName is requried!"),
});

export const createDoctorValidate = async (data) => {
      return await createDoctorSchema.validate(data).catch(err => {
            const message = err.errors;
            const key = err.path;
            return { message, key }
      });
};