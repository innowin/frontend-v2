//@flow
import * as React from "React";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {EditIcon} from "src/images/icons";
import {VerifyWrapper} from "src/views/common/cards/Frames";

type AbilityItemWrapperProps = {
    showEdit? : boolean,
    children : React.Node
}
export class AbilityItemWrapper extends React.Component<AbilityItemWrapperProps> {
    render() {
        const {showEdit} = this.props;
        return (
            <div className="-itemWrapperSkill">
                <div className="-itemEditBtn" ><EditIcon/></div>
                {this.props.children}
            </div>
        )
    }
}
type AbilityBodyProps = {
    description : string
}
export class AbilityBody extends React.Component<AbilityBodyProps> {

    render() {
        const {description} = this.props;
        return (
            <p className="skill-description">
                {description}
            </p>
        )
    }
}
type AbilityFooterProps = {
}
export class AbilityFooter extends React.Component<AbilityFooterProps> {
    render() {

        return (
            <div className="skillTags">

            </div>
        )
    }
}
type AbilityViewProps = {
    showEdit: PropTypes.func.isRequired,
    ability: PropTypes.object.isRequired,
}
export class AbilityView extends React.Component<AbilityViewProps,{viewerCount: number, isLoading: boolean, error: boolean}> {
    state = {viewerCount: 0, isLoading: false, error: false};
    constructor(props:AbilityViewProps) {
        super(props);
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    }

    render() {
        const {showEdit, ability} = this.props;
        const {viewerCount,isLoading, error} = this.state;
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                <AbilityItemWrapper showEdit = {showEdit}>
                    <h6>{ability.title}</h6>
                    <AbilityBody description={ability.text}/>
                    <AbilityFooter abilityId={ability.id}/>
                </AbilityItemWrapper>
            </VerifyWrapper>
        )
    }
}
