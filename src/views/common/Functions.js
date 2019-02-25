// @flow
import * as React from 'react'

export const list_of_badge = (myValue: (?string)[]): (?React.Element<'span'>)[] => {
  if (Array.isArray(myValue)) {
    return (
        myValue.map((item, i) => {
          return (
              <span key={i} className="badge badge-success badge-success-style">{item}</span>
          )
        })
    )
  } else {
    return []
  }
};

type createArguments = {
  nextActionData: {}, nextActionType: string, fileIdKey: ?number | ?string
}
export const createFileFunc = (createFileAction: Function, fileString: string, createArguments: createArguments,
                               fileType: string, fileCategory: string) => {
  const {nextActionData, nextActionType, fileIdKey} = createArguments
  const data = {file_string: fileString, nextActionData, nextActionType, fileIdKey, fileType, fileCategory}
  createFileAction(data)
}
