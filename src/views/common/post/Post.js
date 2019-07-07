import React, {useState} from 'react'
import PostView from './PostView'
import CreatePost from './createPost'

export const Post = (props) => {
  const [edit, setEdit] = useState(false)
  const {post} = props

  const _showEdit = () => {
    setEdit(true)
  }

  const _hideEdit = () => {
    setEdit(false)
  }

  const _update = (formValues, postId, postFileIds: []) => {
    const {updatePost, post} = props
    const postRelatedIdentity = post.post_related_identity
    const postOwnerId = postRelatedIdentity.id
    updatePost({formValues, postId, postOwnerId, postFileIds})
  }

  return (
      <div className='post-view-container'>
        {
          edit ?
              <div className="-itemWrapperPost">
                <CreatePost key={'edit ' + post.id} hideEdit={_hideEdit} post={post} updateFunc={_update} isUpdate={true}/>
              </div>
              :
              <PostView post={post}
                        key={'view ' + post.id}
                        showEdit={_showEdit}
                        extendedView={false}
              />
        }
      </div>
  )
}