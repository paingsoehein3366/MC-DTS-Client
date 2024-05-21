import * as yup from 'yup';

export const slotCreateSchema = yup.object().shape({
      endTime: yup.string().required('Time is required!'),
      startTime: yup.string().required('Time is required!'),
      date: yup.string().required('Date is required!'),
});

export const slotCreateValidate = async (data) => {
      return await slotCreateSchema.validate(data).catch(err => {
            const message = err.errors;
            const key = err.path;
            return { message, key }
      });
};