//ResearchInfo flowTypes
import type {userResearchType} from "../../../consts/flowTypes/user/basicInformation";
import {Component} from "react";
import PropTypes from "prop-types";
import {Field, FieldLabel, FieldValue, ItemHeader, VerifyWrapper} from "../../common/cards/Frames";
import {ItemWrapper} from "src/views/common/cards/Frames"
import researchIcon from "../../../images/user/research_svg";
import ResearchInfoEditForm from "./ResearchInfoEditForm";
import * as React from "react";
import {list_of_badge} from "../../common/Functions";

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

type listOfBadge = (?React.Element<'span'>)[]

class ResearchInfo extends Component<ResearchInfoProps, ResearchInfoState> {
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

    let listAuthor: listOfBadge
    if(research){
      listAuthor = list_of_badge(research.author)
    }

    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={researchIcon}>
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
                  <Field>
                    <FieldLabel label={translate['Title'] + ": "}/>
                    <FieldValue value={research.title}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Author'] + ": "}/>
                    <FieldValue value={<span className="dir-rtl">{listAuthor}</span>}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Publication'] + ": "}/>
                    <FieldValue value={research.publication}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Year'] + ": "}/>
                    <FieldValue value={research.year}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Page Count'] + ": "}/>
                    <FieldValue value={research.page_count}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Research Link'] + ": "}/>
                    <FieldValue value={research.research_link}/>
                  </Field>
                  <Field>
                    <FieldLabel label={translate['Url'] + ": "}/>
                    <FieldValue value={research.url}/>
                  </Field>
                </div>
            )}
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

export default ResearchInfo