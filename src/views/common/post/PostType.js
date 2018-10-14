// @flow
import * as React from "react";
import PropTypes from "prop-types";

import type {postType} from "../../../consts/flowTypes/common/post";
import constants from "../../../consts/constants";
import SupplyIcon from "../../../images/common/supply_svg";
import DemandIcon from "../../../images/common/demand_svg";

type PostTypeProps = {
  post: postType,
  translate: { [string]: string }
}
const PostType = (props: PostTypeProps) => {
  const {post, translate} = props
  let supplyIcon, demandIcon, postIcon, postType = '', postTitle
  if (post) {
    supplyIcon = post.post_type === constants.POST.POST_TYPE.SUPPLY
    demandIcon = post.post_type === constants.POST.POST_TYPE.DEMAND
    postIcon = post.post_type === constants.POST.POST_TYPE.POST
    postTitle = post.post_title
    postType = translate['Type ' + post.post_type]
  }

  return (
      <div className='post-type-container'>
              <span>{
                ((postIcon) && <i className="fa fa-share-alt" aria-hidden="true"/>) ||
                ((supplyIcon) && <SupplyIcon height="19px"/>) ||
                ((demandIcon) && <DemandIcon height="22px"/>)}
                </span>
        <div className='post-type'>
          <span className='title-label'>{postType + ': '}</span>
          <span className='title'>{postTitle}</span>
        </div>
      </div>
  )
}

PostType.propTypes = {
  post: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default PostType