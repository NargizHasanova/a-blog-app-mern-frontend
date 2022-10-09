import React, { useEffect } from 'react'

import { Post } from '../components/Post/Post'
import { AddComment } from '../components/AddComment/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useSelector } from 'react-redux'
import Axios from '../axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { PostSkeleton } from '../components/Post/Skeleton'
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const [singlePostData, setSinglePostData] = useState({})
  const [isloading, setIsloading] = useState(true)
  const { id } = useParams()
  console.log(singlePostData)

  useEffect(() => {
    try {
      (async () => {
        const { data } = await Axios.get(`/posts/${id}`)
        setSinglePostData(data)
        setIsloading(false)
      })()
    } catch (err) {
      console.log(err);
    }

  }, [])

  if (isloading) {
    return <PostSkeleton />
  }
  console.log(singlePostData._id);
  return (
    <>
      <Post
        _id={singlePostData._id}
        title={singlePostData.title}
        imageUrl={singlePostData.imageUrl ? singlePostData.imageUrl : "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"}
        userInfo={singlePostData.user}
        createdAt={singlePostData.createdAt}
        viewsCount={singlePostData.viewsCount}
        commentsCount={3}
        tags={singlePostData.tags}
        isFullPost
      >
        <ReactMarkdown>{singlePostData.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text:
              'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  )
}
