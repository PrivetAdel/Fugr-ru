import React from 'react';

const SelectedItem = ({selectedItem}) => {
  const { 
    firstName, 
    lastName, 
    description = 'description', 
    address = {
      streetAddress: 'street', 
      city: 'city', 
      state: 'state', 
      zip: 'zip'
    } 
  } = selectedItem;

  return (
    <div className="selected-item__container">
      <p>Выбран пользователь: <b>{firstName} {lastName}</b></p>
      <p>Описание: {description}</p>
      <p>Адрес проживания: <b>{address.streetAddress}</b></p>
      <p>Город: <b>{address.city}</b></p>
      <p>Провинция/штат: <b>{address.state}</b></p>
      <p>Индекс: <b>{address.zip}</b></p>
    </div>
  )
}

export default SelectedItem;
