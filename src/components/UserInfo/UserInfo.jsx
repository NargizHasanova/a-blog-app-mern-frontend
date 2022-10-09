import React from 'react'
import styles from './UserInfo.module.scss'

export const UserInfo = ({ user, createdAt }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={user.avatarUrl || '/noavatar.png'}
        alt={user.fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{user.fullName}</span>
        <span className={styles.additional}>{createdAt}</span>
      </div>
    </div>
  )
}
