export type userType = {|
  id: number,
  username: string,
  password: string,
  date_joined: string,
  is_staff: boolean,
  is_active: boolean,
  profile_media: ?number,
  [string]: ?string
|}

export type userProfileType = {|
  id: number,
  profile_user: number,
  profile_strength: number,
  created_time: string,
  updated_time: string,
  gender: string,
  web_site: Array<?string>,
  phone: Array<?string>,
  mobile: Array<?string>,
  is_plus_user: boolean,
  is_user_organization: boolean,
  profile_banner: ?number,
  profile_media: ?number,
  [string]: ?string
|}

export type userEducationType = {|
  id: number,
  created_time: string,
  updated_time: string,
  grade: string,
  university: string,
  field_of_study: string,
  average: ?number,
  education_user: number,
  from_date: ?string,
  to_date: ?string,
  description: ?string,
|}


export type userResearchType = {|
  id: number,
  created_time: string,
  updated_time: string,
  title: string,
  author: Array<?string>,
  research_user: number,
  page_count: ?number,
  year: ?number,
  publication: ?string,
  research_link: ?string,
  url: ?string
|}