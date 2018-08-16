import type {identityType, userProfileType, userType} from "./user/basicInformation"
import type {errorObjectType} from "./common/commonTypes"
import type {organizationType} from "./organization/organization";


export type listOfIdObject = {|
  content: (number)[],
  isLoading: boolean,
  error: errorObjectType
|}

export type profileStateObject = {|
  content: userProfileType | {},
  isLoading: boolean,
  error: errorObjectType
|}

export type userStateObject = {|
  content: userType | {},
  isLoading: boolean,
  error: errorObjectType
|}

export type identityStateObject = {|
  content: identityType | {},
  isLoading: boolean,
  error: errorObjectType
|}

export type organStateObject = {
  content: organizationType | {},
  isLoading: boolean,
  error: errorObjectType
}