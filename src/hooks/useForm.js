import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate, handleNavigate, handleErrors }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log('form 작성 내용 확인', values);
  const handleFillIn = (property) => {
    setValues((values) => ({ ...values, ...property }));
  };

  const handleLeaveBlank = (property) => {
    setValues((values) => ({ ...values, ...property }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = (validate && validate(values)) || {};
    let onSubmitResult = null;

    if (Object.keys(newErrors).length === 0) {
      onSubmitResult = await onSubmit();
    }

    setErrors(newErrors);
    handleErrors && Object.keys(newErrors).length !== 0 && handleErrors();
    setIsLoading(false);
    onSubmitResult && handleNavigate(onSubmitResult);
  };

  return {
    values,
    errors,
    isLoading,
    setIsLoading,
    handleFillIn,
    handleLeaveBlank,
    handleSubmit,
    handleNavigate
  };
};

export default useForm;
