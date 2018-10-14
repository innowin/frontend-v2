// @flow
import * as React from 'react'
import Tip from "../../../common/Text/Tip"
import BtnBar from "../../../common/BtnBar/BtnBar"
import type {ActType} from "../../../common/BtnBar/BtnBar"


type Props = {
  btnBarActs: Array<ActType>,
}

export default (props: Props) => {
  const {btnBarActs} = props
  return (
      <div className="basic-info">
        <Tip
            desc="توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح
            مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از
            بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس"
        />
        <BtnBar acts={btnBarActs}/>
      </div>
  )
}