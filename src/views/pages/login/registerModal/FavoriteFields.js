// @flow
import * as React from 'react'
import PropTypes from "prop-types"

import ExchangeCard from '../../../common/components/ExchangeCard'
import {TickSvgIcon} from "../../../../images/icons";
import FontAwesome from "react-fontawesome";

// TODO: mohammad change this to flowTypes folder when know what is backend type
type fieldType = {
  id: number,
  img: string,
  name: string,
}
type ContentUserProps = {
  translate: { [string]: string },
}

type ContentUserState = {
  selectedFavorites: Array<fieldType>,
  //TODO: mohammad change this fields from state to props
  fields: fieldType[]
}

class FavoriteFields extends React.Component<ContentUserProps, ContentUserState> {
  constructor(props: ContentUserProps) {
    super(props)
    this.state = {
      selectedFavorites: [],
      fields: [
        {
          id: 1,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 2,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 3,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 4,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 5,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 6,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 7,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 8,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 9,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 10,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 11,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 12,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 13,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 14,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 15,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 16,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 17,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 18,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
        {
          id: 19,
          img: 'http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg',
          name: 'رسانه',
        },
      ]
    }
  }

  selectField = (selectedField: fieldType) => {
    let {selectedFavorites} = this.state
    if (selectedFavorites.includes(selectedField)) {
      this.setState({
        ...this.state,
        selectedFavorites: selectedFavorites.filter(favorite => favorite !== selectedField),
      })
    }
    else {
      this.setState({
        ...this.state,
        selectedFavorites: [...new Set([...selectedFavorites, selectedField])],
      })
    }
  }

  render() {
    const {translate} = this.props
    const {selectedFavorites, fields} = this.state

    return (
        <div className='favorite-fields-container'>
          <div className='favorite-fields-image-container'>
            {fields.map(field =>
                <div key={'field' + field.id} className='favorite-container pulse' onClick={() => this.selectField(field)}>
                  <img className='favorite-image' src={field.img} alt='favorite field image'/>
                  <p className='favorite-name'>{field.name}</p>
                  {selectedFavorites.includes(field) && <TickSvgIcon className='tick-icon'/>}
                </div>
            )}
          </div>
          <div className='favorite-fields-text-container'>
            {selectedFavorites.length > 0
                ? selectedFavorites.map(selected =>
                    <div className='favorite-text'>
                      {selected.name}
                    </div>)
                : <div className='select-field-text-container'>
                  <FontAwesome name='circle' className='required-icon'/>
                  <p className='select-field-error'>{translate['Select at least one favorite']}</p>
                </div>
            }
          </div>
        </div>
    )
  }
}

FavoriteFields.propTypes = {
  translate: PropTypes.object.isRequired,
}

export default FavoriteFields