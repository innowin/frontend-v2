// @flow
import * as React from "react"
import PropTypes from "prop-types"

import ResearchInfoEditForm from "./ResearchInfoEditForm"
import type {userResearchType} from "../../../consts/flowTypes/user/basicInformation"
import {Field, FieldValue, ItemHeader, VerifyWrapper} from "../../common/cards/Frames"
import {ItemWrapper} from "src/views/common/cards/Frames"
import {EducationIcon} from "../../../images/icons"

//ResearchInfo flowTypes
type ResearchInfoProps = {
  research: userResearchType,
  updateResearchByUserId: Function,
  deleteResearchByUserId: Function,
  userId: number,
  translate: { [string]: string },
}
type ResearchInfoState = {
  edit: boolean,
}

class ResearchInfo extends React.Component<ResearchInfoProps, ResearchInfoState> {
  static propTypes = {
    research: PropTypes.object.isRequired,
    updateResearchByUserId: PropTypes.func.isRequired,
    deleteResearchByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: ResearchInfoProps) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {userId, deleteResearchByUserId, research} = this.props
    const researchId = research.id
    this._hideEdit()
    deleteResearchByUserId({userId, researchId})
  }

  // FixMe: mohammad isLoading and error come from redux
  render() {
    const {translate, research, updateResearchByUserId, userId} = this.props
    const {edit} = this.state

    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={<EducationIcon/>}>
            {edit ? (
                <ResearchInfoEditForm
                    userId={userId}
                    research={research}
                    hideEdit={this._hideEdit}
                    update={updateResearchByUserId}
                    deleteResearchByUserId={this._delete}
                    translate={translate}
                />
            ) : (
                research &&
                <div>
                  <ItemHeader title={translate['ResearchInfo']} showEdit={this._showEdit}/>
                  {research.title &&
                  <Field>
                    {research.url ?
                        <a href={research.url}>
                          <FieldValue value={research.title}/>
                        </a>
                        : <FieldValue value={research.title}/>
                    }
                  </Field>
                  }
                  {(research.publication || research.url || research.year) &&
                  <Field>
                    <FieldValue
                        value={`${research.publication ? research.publication + translate[', '] : ''}${research.year ? research.year + translate[', '] : ''}${research.page_count ? `${research.page_count} ${translate['Page']}` : ''}`}/>
                  </Field>
                  }
                  {research.author &&
                  <Field>
                    <FieldValue value={<span className="dir-rtl">{research.author.join('، ')}</span>}/>
                  </Field>
                  }
                  {research.research_link &&
                  <Field>
                    <a className='download-research' href={research.research_link}>
                      <p className='download-file'>{translate['Download file']}</p>
                    </a>
                  </Field>
                  }
                </div>
            )}
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

export default ResearchInfo