import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import styles from './MyInfo.module.css';

const USER_DATA = 'userData';

const MyInfo = () => {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
      
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('age', userData.age);
    } catch (error) {
      console.error(error)
    }
  }, [setValue])

  const handleFormSubmit = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data))
      alert('Usuario actualizado');
    } catch (error) {
      alert('Ha ocurrido un error')
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <label className={styles.label}>
        Nombre
        <input 
          type="text" 
          name="name" 
          {...register('name', { required: true, minLength: 1, maxLength: 120 })} 
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Email
        <input 
          type="text"
          name="email" 
          {...register('email', { required: true, minLength: 1, maxLength: 120 })}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Edad
        <input
          type="number"
          name="age"
          {...register('age', { required: true, min: 1, max: 120, valueAsNumber: true })}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.submitButton} >Guardar</button>
    </form>
  )
}

export default MyInfo;