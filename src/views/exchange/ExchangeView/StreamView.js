import * as React from "react"
import PostView from "src/views/common/post/PostView"
import {ClipLoader} from "react-spinners"
import {connect} from "react-redux"
import {exchangePostSelector} from "src/redux/selectors/common/post/exchangePostSelector"

class StreamView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(): void {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  render() {
    const {exchangeId, exchanges, exchangePosts} = this.props

    if (exchanges[exchangeId] && exchanges[exchangeId].owner) {
      return exchangePosts.map((p, key) =>
          <div className={"posts-frame-container"} key={key}>
            <div className={"post-view-container"}>
              <PostView post={p} extendedView={false}
                  // showEdit={this._showEdit}
              />
            </div>
          </div>,
      )
    }
    else return (
        <div className={"info-loading"}>
          <ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/>
        </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let {exchangeId} = props
  return {
    exchanges: state.exchanges.list,
    exchangePosts: exchangePostSelector(state, exchangeId),
  }
}

export default connect(mapStateToProps)(StreamView)