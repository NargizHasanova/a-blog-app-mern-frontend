import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from './../../redux/slices/userSlice'
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const { isAuthorized } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  console.log({ isAuthorized })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const res = await dispatch(fetchLogin(data))
    console.log(res.payload);
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Войти
        </Button>
      </form>
    </Paper>
  )
}
