import * as yup from 'yup';

export const slotCreateSchema = yup.object().shape({
      date: yup.string().required('Date is required!'),
      startTime: yup.string().required('StartTime is required!'),
      endTime: yup.string().required('EndTime is required!')
});

export const slotCreateValidate = async (data) => {
      return await slotCreateSchema.validate(data).catch(err => {
            const message = err.errors;
            const key = err.path;
            return { message, key }
      });
};