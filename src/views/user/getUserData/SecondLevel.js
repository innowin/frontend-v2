import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'

class SecondLevel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }
  }

  addTag(id) {
    let {selected} = this.state
    if (selected.indexOf(id) !== -1) {
      selected.splice(selected.indexOf(id), 1)
      this.setState({...this.state, selected})
    }
    else {
      this.setState({...this.state, selected: [...selected, id]})
    }
  }

  submit = () => {
    const {updateUserByUserId, current_user_identity, setThirdLevel} = this.props
    const {selected} = this.state
    updateUserByUserId({identity_hashtag: selected}, current_user_identity)
    setThirdLevel(selected)
  }

  render() {
    const {HashTags, typeOfUser} = this.props
    const {selected} = this.state
    return (
        <div className='get-data-content'>
          <div>زمینه های مورد علاقه خود را انتخاب کنید:</div>
          <div className='get-data-hashtags-cont'>
            {
              Object.values(HashTags).length > 0 ?
                  Object.values(HashTags).filter(p => p.hashtag_type === typeOfUser).map((tag, index) =>
                      <div key={index} className={selected.indexOf(tag.id) !== -1 ? 'organization-leadership-job-hashtags-selected' : 'organization-leadership-job-hashtags'} onClick={() => this.addTag(tag.id)}>{tag.title}</div>,
                  )
                  : <ClipLoader/>
            }
          </div>
          <div>
            <div className='get-data-content-next-button-on' onClick={this.submit}>بعدی</div>
          </div>
        </div>
    )
  }
}

export default SecondLevel