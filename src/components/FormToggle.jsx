import React from 'react';

const FormToggle = ({ isOpenForm, setIsOpenForm, isFetching, error }) => {
  return (
    <button 
      className="button form-toggle__button" 
      disabled={isFetching || error}
      onClick={() => setIsOpenForm((isOpenForm) => !isOpenForm)} >
      {isOpenForm ? 'скрыть' : 'добавить'}
    </button>
  )
}

export default FormToggle;
