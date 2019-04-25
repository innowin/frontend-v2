import * as React from 'react'
import PostSkeleton from './PostSkeleton'
import UserHeaderSkeleton from './UserHeaderSkeleton'
import UserSideSkeleton from './UserSideSkeleton'

const UserSkeleton = (props) => {
  return (
      <div className='all-exchanges-parent media-header'>
        <UserSideSkeleton type={props.type}/>
        <div className='container-skeleton'>
          <UserHeaderSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </div>
      </div>
  )
}

export default UserSkeleton