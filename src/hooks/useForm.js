import { useState, useCallback } from 'react';

const useForm = ({ initialValues, onSubmit, validate, handleNavigate, handleErrors }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFillIn = useCallback((param) => {
    setValues((values) => ({ ...values, ...param }));
  }, []);

  const handleLeaveBlank = useCallback((param, blankValue) => {
    setValues((values) => ({ ...values, [param]: blankValue || null }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
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
  }, []);

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
