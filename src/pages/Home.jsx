import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slices/postSlice'
import { PostSkeleton } from '../components/Post/Skeleton'
import { fetchMe } from '../redux/slices/userSlice'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector((state) => state.posts) // posts eto store.js => posts:
  const { user } = useSelector((state) => state.users) 
  // const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    // const res = dispatch(fetchMe())
    // if (res.payload._id === user._id) {
    //   setIsEditable(true)
    // }
  }, [])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts.status === 'loading' ? (
            <PostSkeleton />
          ) : (
            posts.items.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                userInfo={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags} // ['poliklinika', 'heyecan'...]
                isLoading={posts.status === 'loading'}
                isEditable={post.user?._id === user?._id}
              />
            ))
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tags.status === 'loading'} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
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
          />
        </Grid>
      </Grid>
    </>
  )
}
