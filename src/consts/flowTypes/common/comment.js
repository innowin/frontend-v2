import type {userType} from "../user/basicInformation";
import type {organizationType} from "../organization/organization";

export type commentType = {
  id: number,
  created_time: string,
  updated_time: string,
  delete_flag: boolean,
  text: string,
  comment_parent: {
    id: number,
    created_time: string,
    updated_time: string,
    delete_flag: boolean,
    child_name: string
  },
  comment_sender: {
    id: number,
    email: boolean,
    first_name: string,
    last_name: string,
    username: string,
  },
  comment_picture: {},
  comment_replied_to: {
    id: number,
    comment_sender: {
      id: number,
      identity_user: {
        id: number,
        username: string,
        first_name: string,
        last_name: string,
        email: string
      },
      created_time: string,
      delete_flag: boolean,
      child_name: string,
      name: string,
      accepted: boolean,
      mobile_verified: boolean,
      email_verified: boolean,
      identity_organization: {}
    },
    created_time: string,
    updated_time: string,
    delete_flag: boolean,
    text: string,
    comment_parent: number,
    comment_picture: {},
    comment_replied_to: {}
  }
}