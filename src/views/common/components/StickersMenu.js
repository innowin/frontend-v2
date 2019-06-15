import React, {PureComponent} from 'react'
import {EmojiSvg} from '../../../images/icons'

class StickersMenu extends PureComponent {
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
        <div ref={e => this.menu = e} className='stickers-container'>
          <div className='emoji-inline-block' onClick={this.handleOpen}><EmojiSvg className='emoji-logo'/></div>
          <div className={this.state.open ? 'stickers-menu-container' : 'stickers-menu-container-close'}
               style={this.props.ltr ? {right: '0'} : {left: '0'}}>
            <div className='stickers-menu-scroll'>
              {
                this.state[this.state.tab] && this.state[this.state.tab].map((emoji, i) =>
                    <div key={i} onClick={() => this.props.output(emoji)} style={{width: '30px', display: 'inline-block', overflow: 'hidden', color: 'black'}}>{emoji}</div>
                )
              }
            </div>
            <div className='stickers-menu-tabs'>
              <div className={this.state.tab === 'first' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='first' onClick={this.handleTab}><span id='first' role='img' aria-label=''>😀</span></div>
              <div className={this.state.tab === 'second' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='second' onClick={this.handleTab}><span id='second' role='img' aria-label=''>👍🏼</span></div>
              <div className={this.state.tab === 'third' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='third' onClick={this.handleTab}><span id='third' role='img' aria-label=''>🎈</span></div>
              <div className={this.state.tab === 'forth' ? 'stickers-menu-tab-select' : 'stickers-menu-tab'} id='forth' onClick={this.handleTab}><span id='forth' role='img' aria-label=''>❤</span></div>
            </div>
          </div>
        </div>
    )
  }
}

export default StickersMenu