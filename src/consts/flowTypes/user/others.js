export type workExperienceType = {|
  id: number,
  created_time: string,
  updated_time: string,
  name: ?string,
  position: ?string,
  from_date: ?string,
  to_date: ?string,
  status: string,
  work_experience_user: number,
  work_experience_organization: number
|}

export type workExperienceFormValuesType = {|
  name: ?string,
  position: ?string,
  from_date: ?string,
  to_date: ?string,
  work_experience_organization: number
|}

export type certificateType = {|
  id: number,
  created_time: string,
  updated_time: string,
  title: string,
  certificate_user: number,
  picture_media: ?number
|}

export type certificateFormValuesType = {|
  title: string,
  picture_media: ?number
|}

export type skillType = {|
  id: number,
  created_time: string,
  updated_time: string,
  title: string,
  tag: (string)[],
  description: ?string,
  skill_user: number
|}

export type skillFormValuesType = {|
  title: string,
  tag: (string)[],
  description: ?string
|}