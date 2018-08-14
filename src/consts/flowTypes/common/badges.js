import {fileType} from "../fileType"
export type badgesTypes = {
  id: 2526,
  created_time: string,
  updated_time: string,
  badge_active: boolean,
  badge_related_badge_category: {
    id: number,
    created_time: string,
    updated_time: string,
    child_name: string,
    badge_title: string,
    badge_description: ?string,
    badge_related_media: fileType,
    badge_related_user: ?number,
    badge_category_related_parent: ?number
  },
  badge_related_parent: {
    id: 2,
    created_time: string,
    updated_time: string,
    child_name: string
  }
}