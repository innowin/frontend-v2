import * as React from "react"
import PostSkeleton from "./PostSkeleton"
import UserHeaderSkeleton from "./UserHeaderSkeleton"
import UserSideSkeleton from "./UserSideSkeleton"

class UserSkeleton extends React.Component {

  render() {
    return (
        <div className='all-exchanges-parent'>
          <UserSideSkeleton/>
          <div className='container-skeleton'>
            <UserHeaderSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
          </div>
        </div>
    )
  }

}

export default UserSkeleton