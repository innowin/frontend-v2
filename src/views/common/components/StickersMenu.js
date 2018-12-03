import React, {Component} from 'react'
import {EmojiSvg} from "../../../images/icons"

class StickersMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      first: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😊', '😋', '😎', '😍', '😘', '😶', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '😮', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😜', '😛', '😌', '😴', '😫', '😯', '😪', '😱', '🤐', '😝', '🤤', '😒', '😓', '😔', '😈', '👿', '👹'],
      second: ['👍🏼', '👎🏼', '🙏🏼', '👌🏼', '👋🏼', '💪🏼', '🤘🏼', '🖖🏼', '🤞🏼', '👆🏼', '👇🏼', '👈🏼', '👉🏼', '🖐🏼', '👏🏼', '🙌🏼'],
      third: ['🎈', '🎁', '🎀', '🎄', '🎉', '🎊', '🎃', '🔑', '🔒', '💣', '📱', '💻', '🖥', '🖨', '⌨', '🖱', '💿', '💾', '✏', '🖋', '🖊', '🎥', '🎬', '✉', '💼', '🗓', '📎', '⏳', '⏰', '📂', '📌', '🗑'],
      forth: ['🧡', '💛', '💙', '💚', '💜', '🖤', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '🔞', '🚭', '🔕', '🔇', '🚫', '❌', '🚷', '🚯', '🚳', '💦', '💯'],
      tab: 'first'
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown)
  }

  handleMouseDown(e) {
    if (this.state.open && this.menu && !this.menu.contains(e.target)) {
      this.setState({...this.state, open: false})
    }
  }

  handleOpen = () => {
    this.setState({...this.state, open: !this.state.open})
  }

  handleTab = (e) => {
    this.setState({...this.state, tab: e.target.id})
  }

  render() {
    return (
        <div className='stickers-container'>
          <div className='emoji-inline-block' onClick={this.handleOpen}><EmojiSvg className='emoji-logo'/></div>
          <div ref={e => this.menu = e} className={this.state.open ? 'stickers-menu-container' : 'stickers-menu-container-close'}>
            <div style={{overflow: 'auto', height: '150px'}}>
              {
                this.state[this.state.tab].map(emoji =>
                    <div onClick={() => this.props.output(emoji)} style={{width: '30px', display: 'inline-block', overflow: 'hidden', color: 'black'}}>{emoji}</div>
                )
              }
            </div>
            <div className='stickers-menu-tabs'>
              <div className={this.state.tab === 'first' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='first' onClick={this.handleTab}>😀</div>
              <div className={this.state.tab === 'second' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='second' onClick={this.handleTab}>👍🏼</div>
              <div className={this.state.tab === 'third' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='third' onClick={this.handleTab}>🎈</div>
              <div className={this.state.tab === 'forth' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='forth' onClick={this.handleTab}>❤</div>
            </div>
          </div>
        </div>
    )
  }
}

export default StickersMenu