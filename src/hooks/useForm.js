import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate, handleNavigate, handleErrors }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFillIn = (param) => {
    if (isEventObject(param)) {
      setValues((values) => ({ ...values, [param.target.name]: param.target.value }));
      return;
    }

    setValues((values) => ({ ...values, ...param }));
  };

  const handleLeaveBlank = (param, blankValue) => {
    if (isEventObject(param)) {
      setValues((values) => ({ ...values, [param.target.name]: null }));
      return;
    }

    setValues((values) => ({ ...values, [param]: blankValue || null }));
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

const isEventObject = (e) => e.target;
