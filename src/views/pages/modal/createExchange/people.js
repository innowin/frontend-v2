// @flow
import * as React from 'react'
import Tip from "../../../common/Text/Tip"
import Select from 'react-select'
import type {TagAsOptionType} from "../../adding-contribution/types";
import Input from "../../../common/inputs/StateLessTextInput"
import Image from "../../../common/image/visibleOnLoadImage"
import type {ActType} from "../../../common/BtnBar/BtnBar";
import CircularProgressbar from 'react-circular-progressbar';
import {exchangeIdentityFields} from "./createExchangeData"
import FontAwesome from "react-fontawesome"
import {DefaultUserIcon} from "../../../../images/icons"


type BtnProps = {
  act: ActType
}

const Btn = (props: BtnProps) => {
  const {act} = props
  return (
      <div
          key={`act-btn-${act.title}`}
          className={`act-btn ${act.className || ''}`}
          onClick={act.func}
      >
        {act.title}
        {act.icon}
      </div>
  )
}

type BtnBarProps = {
  acts: Array<ActType>,
  membersCount: number
}

const progressStyle = {
  // Customize the root svg element
  root: {},
  // Customize the path, i.e. the part that's "complete"
  path: {
    // Tweak path color:
    stroke: "#1a2147",
    // Tweak path to use flat or rounded ends:
    strokeLinecap: "butt",
    // Tweak transition animation:
    transition: "stroke-dashoffset 0.5s ease 0s"
  },
  text: {
    // Tweak text color:
    fill: "#a5a5a5",
    // Tweak text size:
    fontSize: "20px"
  }
}

const BtnBar = (props: BtnBarProps) => {
  const {acts, membersCount} = props
  return (
      <div className="act-bar">
        <Btn act={acts[0]}/>
        <CircularProgressbar
            styles={progressStyle}
            percentage={(membersCount / 50) * 100}
            text={`${membersCount}/50`}
        />
        <Btn act={acts[1]}/>
      </div>
  )
}

export type PersonType = {
  img: string,
  name: string,
  id: string
}

type AddBrnProps = {
  bool: boolean,
  trueTitle: string,
  trueFunc?: Function,
  falseTitle: string,
  falseFunc: Function,
  isInAct: boolean
}

const BoolBtn = (props: AddBrnProps) => {
  const {bool, trueFunc, falseFunc, trueTitle, falseTitle, isInAct} = props
  const setOnClick = () => {
    if (!isInAct) return bool ? trueFunc : falseFunc
    return () => {
    }
  }
  const onClick = setOnClick()
  return (
      <span
          onClick={onClick}
          className={`bool-btn ${bool ? 'true' : ''} ${isInAct ? 'in-act' : ''}`}
      >
        <span className="title">
          {bool ? trueTitle : falseTitle}
        </span>
        <FontAwesome name="spinner"/>
      </span>
  )
}

type PersonInfoProps = {
  person: PersonType,
}
const PersonInfo = (props: PersonInfoProps) => {
  const {person} = props
  return (
      <div className="person-info">
        {person.img ?
            <Image className="person-img" img={person.img}/>
            :
            <DefaultUserIcon className="person-img"/>
        }
        <div className="info">
          <span className="name">{person.name}</span>
        </div>
      </div>
  )
}

type PersonProps = {
  person: PersonType,
  addMember: Function,
  members: Array<{}>,
  inActIds: Array<string>
}

const Person = (props: PersonProps) => {
  const {person, addMember, members, inActIds} = props
  return (
      <div className="person">
        <PersonInfo person={person}/>
        <BoolBtn
            bool={members.some(m => m[exchangeIdentityFields.identity].id === person.id)}
            isInAct={inActIds.includes(person.id)}
            falseFunc={() => addMember(person.id)}
            falseTitle="افزودن"
            trueTitle="افزوده‌شده"
        />
      </div>
  )
}

type PeopleSelectionProps = {
  people: Array<PersonType>,
  searchKey: string,
  addMember: Function,
  members: Array<{}>,
  inActIds: Array<string>
}

const PeopleSelection = (props: PeopleSelectionProps) => {
  const {people = [], searchKey, addMember, members, inActIds} = props
  const filteredPeople = people.filter(person => {
    return person.name.includes(searchKey)
  })

  return (
      <div className="people-selection">
        <div className="scroll-less">
          {filteredPeople.map(person => (
              <Person
                  members={members}
                  addMember={addMember}
                  key={`person-${person.id}`}
                  person={person}
                  inActIds={inActIds}
              />
          ))}
        </div>
      </div>
  )
}


type HeaderProps = {
  searchKey: string,
  searchHandler: (string) => void
}

const Header = (props: HeaderProps) => {
  const {searchKey, searchHandler} = props
  return (
      <div className="header">
        <Tip
            desc="شما میتوانید در ابندا تا سقف ۵۰ کاربر را مستقیما عضو بورس کنید."
        />
        <Input
            onChange={(e: SyntheticEvent<HTMLInputElement>) => searchHandler(e.currentTarget.value)}
            value={searchKey}
        />
      </div>
  )
}

type Props = {
  searchHandler: (string) => void,
  searchKey: string,
  people: Array<PersonType>,
  btnBarActs: Array<ActType>,
  addMember: Function,
  members: Array<{}>,
  inActIds: Array<string>
}

export default (props: Props) => {
  const {
    searchHandler,
    searchKey,
    people,
    btnBarActs,
    addMember,
    members,
    inActIds
  } = props
  return (
      <div className="people">
        <Header
            searchHandler={searchHandler}
            searchKey={searchKey}
        />
        <PeopleSelection
            members={members}
            people={people}
            searchKey={searchKey}
            addMember={addMember}
            inActIds={inActIds}
        />
        <BtnBar membersCount={members.length} acts={btnBarActs}/>
      </div>
  )
}