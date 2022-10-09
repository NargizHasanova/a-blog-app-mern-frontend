import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchRegister } from '../../redux/slices/userSlice'

export const Registration = () => {
  const { isAuthorized } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    console.log(data)
    const res = await dispatch(fetchRegister(data))
    if (!res.payload) {
      return alert('ne udalos avtorizovatsa')
    }
    if ('token' in res.payload) {
      window.localStorage.setItem('token', res.payload.token)
    }
  }

  if (isAuthorized) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type="text"
          fullWidth
          {...register('fullName', { required: 'укажите имя' })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          fullWidth
          {...register('email', { required: 'укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.email?.message)}
          helperText={errors.password?.message}
          type="password"
          fullWidth
          {...register('password', { required: 'укажите пароль' })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
