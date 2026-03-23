import './RegisterForm.css';
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import RegisterSchema from '../../../formSchema/RegisterSchema';
import { useEffect } from 'react';


const RegisterForm = () => {

  useEffect(() => {

    if (isSubmitSuccessful) {
      reset(undefined, { keepValues: true, keepDirty: false, keepDefaultValues: false });
    }

  });
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm({
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
    shouldFocusError: true
  })
  const onSubmit = async (data) => {
    reset()
  }
  return (
    <div className="form-wrapper">
      <div className="form-section-header">
        <h2 className="form-section-title">Re<span>gister</span></h2>
      </div>

      <p className="form-description">
        To be updated with all the latest news, offers and special announcements.
      </p>

      <form className="custom-news-form" onSubmit={handleSubmit(onSubmit)}>


        <div className="input-group">
          <label htmlFor="user-email">UserName</label>
          <input
            {...register('username')}
            type="text"
            id="username"
            placeholder="username"
          />
          {
            errors.username && (
              <div>{`${errors.username.message}`}</div>
            )
          }
        </div>

        <div className="input-group">
          <label htmlFor="user-email">Email Address</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="example@example.com"
          />
          {
            errors.email && (
              <div>{`${errors.email.message}`}</div>
            )
          }
        </div>



        <div className="input-group">
          <label htmlFor="user-email">Password</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="123456"
          />
          {
            errors.password && (
              <div>{`${errors.password.message}`}</div>
            )
          }
        </div>


          <div className="input-group">
          <label htmlFor="user-email">Password Confirm</label>
          <input
            {...register('password_confirm')}
            type="password"
            id="password_confirm"
            placeholder="123456"
          />
          {
            errors.password_confirm && (
              <div>{`${errors.password_confirm.message}`}</div>
            )
          }
        </div>




        <button type="submit" className="form-btn-submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;