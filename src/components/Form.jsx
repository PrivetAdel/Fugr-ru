import React from 'react';
import { useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

const Form = ({ setNewPerson }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setNewPerson(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form__inner">
        <div>
          <label className="form-label">
            ID
            <input 
              type="number" 
              min="0" 
              className="input"
              placeholder="123"
              {...register("id", { required: true })} />
          </label>

          {errors.id && <p className="form__error-message">This field is required</p>}
        </div>
        
        <div>
          <label className="form-label">
            First name
            <input 
              type="text"
              className="input"
              placeholder="First name"
              {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })} />
          </label>

          {errors.firstName && <p className="form__error-message">This field is required</p>}
          {errors.firstName?.type === 'pattern' && <p className="form__error-message">First name must consist only of Latin letters</p>}
        </div>

        <div>
          <label className="form-label">
            Last name
            <input 
              type="text"
              className="input"
              placeholder="Last name"
              {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })} />
          </label>

          {errors.lastName?.type === 'required' && <p className="form__error-message">This field is required</p>}
          {errors.lastName?.type === 'pattern' && <p className="form__error-message">Last name must consist only of Latin letters</p>}
        </div>

        <div>
          <label className="form-label">
            Email
            <input 
              type="email" 
              className="input"
              placeholder="test@test"
              {...register("email", { required: true })} />
          </label>

          {errors.email && <p className="form__error-message">This field is required</p>}
        </div>

        <div>
          <label className="form-label">
            Phone
            <IMaskInput 
              type="phone" 
              className="input"
              placeholder="(123)456-7890"
              mask="(000)000-0000"
              label="phone"
              lazy={false}
              {...register("phone", { required: true, pattern: /\(([0-9]{3})\)([0-9]{3})-([0-9]{4})/ })} />
          </label>
          
          {errors.phone?.type === 'required' && <p className="form__error-message">This field is required</p>}
          {errors.phone?.type === 'pattern' && <p className="form__error-message">The phone must be ten digits long</p>}
        </div>
      </div>
      
      <input type="submit" value="Добавить в таблицу" className="button" />
    </form>
  );
};

export default Form;
