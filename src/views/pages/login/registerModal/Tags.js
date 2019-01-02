// @flow
import * as React from 'react'
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"
import constants from "../../../../consts/constants";

//TODO: mohammad move this to flowTypes
type tagType = {
  id: number,
  name: string,
  number: number,
}

type ContentUserProps = {
  translate: { [string]: string },
}

type ContentUserStates = {
  tags: Array<tagType>,
  selectedTags: Array<tagType>,
  selectedHeader: string,
  searchTags: Array<tagType>,
  textFieldFocus: boolean,
  textFieldValue: string,
}

class Tags extends React.Component <ContentUserProps, ContentUserStates> {

  //TODO: mohammad remove this states and use and get from props
  constructor(props: ContentUserProps) {
    super(props)
    this.state = {
      selectedTags: [],
      searchTags: [
        {
          id: 1,
          name: 'طراحی تجربه کاربری',
          number: 100,
        },
        {
          id: 2,
          name: 'طراحی',
          number: 20,
        },
        {
          id: 3,
          name: 'بربرییییی',
          number: 30,
        },
        {
          id: 3,
          name: 'بربریی شمسی نشتسدی نشتدسی شنییی',
          number: 30,
        },
      ],
      selectedHeader: constants.TAG_FILTERS.FINANCIAL,
      textFieldFocus: false,
      textFieldValue: '',
      tags: [
        {
          id: 1,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 2,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 3,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 4,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 5,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 6,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 7,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 8,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 9,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 10,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 11,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 12,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 13,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 14,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 15,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 16,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 17,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 18,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 19,
          name: 'تقاضا',
          number: 100,
        },
        {
          id: 20,
          name: 'تقاضا',
          number: 100,
        },
      ],
    }
  }

  selectTag = (tag: tagType) => {
    const {selectedTags} = this.state
    if (selectedTags.includes(tag)) {
      this.setState({
        ...this.state,
        selectedTags: selectedTags.filter(favorite => favorite !== tag),
      })
    }
    else {
      this.setState({
        ...this.state,
        selectedTags: [...new Set([...selectedTags, tag])],
      })
    }
  }

  selectHeader = (type: string) => {
    this.setState({
      ...this.state,
      selectedHeader: type,
    })
  }

  onFocusSearchField = () => {
    this.setState({
      ...this.state,
      textFieldFocus: true,
    })
  }

  onBlurSearchField = () => {
    this.setState({
      ...this.state,
      textFieldFocus: false
    })
  }

  onChangeSearch = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      textFieldValue: event.target.value,
    })
  }

  render() {
    const {translate} = this.props
    const {tags, selectedTags, selectedHeader, textFieldFocus, textFieldValue, searchTags} = this.state

    return (
        <div className='tags-container'>
          <div className='headers-container'>
            <h5 onClick={() => this.selectHeader(constants.TAG_FILTERS.FINANCIAL)}
                className={selectedHeader === constants.TAG_FILTERS.FINANCIAL ? 'header selected-header' : 'header'}>
              {translate['Financial services']}
            </h5>
            <h5 onClick={() => this.selectHeader(constants.TAG_FILTERS.COMMERCE)}
                className={selectedHeader === constants.TAG_FILTERS.COMMERCE ? 'header selected-header' : 'header'}>
              {translate['Commerce']}
            </h5>
            <h5 onClick={() => this.selectHeader(constants.TAG_FILTERS.CONFIRMATION)}
                className={selectedHeader === constants.TAG_FILTERS.CONFIRMATION ? 'header selected-header' : 'header'}>
              {translate['Confirmation and standard']}
            </h5>
            <h5 onClick={() => this.selectHeader(constants.TAG_FILTERS.HOME)}
                className={selectedHeader === constants.TAG_FILTERS.HOME ? 'header selected-header' : 'header'}>
              {translate['Home appliances']}
            </h5>
            <h5 onClick={() => this.selectHeader(constants.TAG_FILTERS.HEALTHCARE)}
                className={selectedHeader === constants.TAG_FILTERS.HEALTHCARE ? 'header selected-header' : 'header'}>
              {translate['Healthcare']}
            </h5>
            <div className='search-container'>
              <FontAwesome name='search' className='search-icon'/>
              <input onChange={this.onChangeSearch} onFocus={this.onFocusSearchField} onBlur={this.onBlurSearchField}
                     className='search-text-field' placeholder={translate['search']}/>
              {textFieldFocus && <div className='search-menu'>
                <div className='search-tag-body'>
                  {searchTags.map(searchTag =>
                      <div key={'search tag ' + searchTag.id} className='search-tag'>
                        <span className='search-tag-text'>{searchTag.name}</span>
                        <span className='search-tag-number'>{searchTag.number}</span>
                      </div>
                  )}
                </div>
                <div className='tag-create-container'>
                  <span className='create-tag-title'>{translate['Create tag']}: </span>
                  {textFieldValue && !searchTags.map(tag => tag.name).includes(textFieldValue) &&
                  <div className='create-tag'>
                    <span className='create-tag-text'>{textFieldValue}</span>
                    <span className='plus-icon'><FontAwesome name='plus'/></span>
                  </div>
                  }
                </div>
              </div>}
            </div>
          </div>
          <div className={textFieldFocus ? 'tags-body-container tags-body-container-blur' : 'tags-body-container'}>
            {tags.map(tag =>
                <span key={'tag' + tag.id}
                      className={selectedTags.includes(tag) ? 'tag-text tag-text-selected pulse' : 'tag-text pulse'}
                      onClick={() => this.selectTag(tag)}>
                  {tag.name}
                </span>
            )}
          </div>
          <div className='selected-tags-container'>
            <h3 className='selected-tags-header'>{translate['Selected tags']}:</h3>
            {selectedTags.length > 0 &&
            <div className='selected-tags-body'>
              {selectedTags.map(tag => <span
                  key={'selected tag' + tag.id} className='selected-tag pulse'
                  onClick={() => this.selectTag(tag)}>
                {tag.name}
                <FontAwesome name='close' className='close-select-tag'/>
                </span>
              )}
            </div>
            }
          </div>
        </div>
    )
  }
}

Tags.propTypes = {
  translate: PropTypes.object.isRequired,
}

export default Tags