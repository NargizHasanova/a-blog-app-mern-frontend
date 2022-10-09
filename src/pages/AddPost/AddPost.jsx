import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { useMemo } from 'react'
import Axios from './../../axios'
import { useEffect } from 'react'

export const AddPost = () => {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const { isAuthorized } = useSelector((state) => state.users)
  const { id } = useParams()

  const isEditing = Boolean(id)

  const inputFileRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      Axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setTags(data.tags.join(','))
          setImageUrl(data.imageUrl)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('file', file) // burdaki 'file' yazisiyla backenddeki 'file' yazisi eyni olmalidi
      const { data } = await Axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('ошибка при загрузке файла')
    }
  }
  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = useCallback((value) => {
    setText(value)
  }, [])

  async function onSubmit() {
    try {
      setLoading(true)
      const fields = {
        title,
        imageUrl,
        text,
        tags: tags.split(','),
      }

      const { data } = isEditing
        ? await Axios.patch(`/posts/${id}`, fields)
        : await Axios.post('/posts', fields)

      const _id = isEditing ? id : data._id
      navigate(`/posts/${_id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  )

  if (!isAuthorized) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()} // click hadiseni perevod edir inpute type file-a
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  )
}
