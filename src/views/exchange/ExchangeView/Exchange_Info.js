import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import postActions from "src/redux/actions/commonActions/postActions"

class Exchange_Info extends Component {

  componentDidMount() {
    this.props.actions.getPosts({postParentId: this.props.exchangeId, limit: 10, offset: 0})
  }

  render() {
    const {posts, exchangeId, activeTab} = this.props
    const {list} = posts

    switch (activeTab) {
      case "Stream":
        return (
            <div>
              {
                Object.values(list).reverse().map((p) => {
                  console.log(p)
                  return (
                      <div className={"posts-frame"}>
                        <img alt={"عکس پروفایل"} src={p.post_related_identity_image !== null ? p.post_related_identity_image.file : null}
                             width={"50px"} height={"50px"} className={"post-user-picture"}/>
                        <div className={"posts-info"}>
                          <div className={"post-user-name"}>
                            {
                              p.post_user.first_name !== "" || p.post_user.last_name !== "" ?
                                  p.post_user.first_name + " " + p.post_user.last_name
                                  :
                                  p.post_user.username
                            }
                          </div>
                          <div className={"posts-date"}>
                            <span>{p.created_time.slice(0, 10)} - {p.created_time.slice(11, 19)}</span>
                          </div>
                        </div>
                        <div className={"posts-description"}>
                          {p.post_description}
                        </div>
                      </div>
                  )
                })
              }
            </div>
        )
      default:
        return (
            <div style={{textAlign: "center"}}>
              Undefined Data Type
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  posts: state.common.post
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPosts: postActions.filterPostsByPostParentLimitOffset
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange_Info)