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

export type WorkExperienceFormInputType = {|
  name: string,
  position: string,
  dayFromDate: string,
  yearFromDate: string,
  monthFromDate: string,
  dayToDate: string,
  yearToDate: string,
  monthToDate: string,
  workExperienceOrganization: string,
|}

export type certificateType = {|
  id: number,
  created_time: string,
  updated_time: string,
  title: string,
  delete_flag: boolean,
  validation_flag: boolean,
  validation_request_flag: boolean,
  certificate_parent: {},
  certificate_identity: {},
  certificate_picture: number,
  certificate_logo: number,
  // added this for show image not in server model
  certificate_picture_file: string,
  certificate_logo_file: string,
|}

export type certificateInputType = {|
  title: string,
  certificatePicture: number,
  certificateLogo: number,
|}

export type certificateFormValuesType = {|
  title: string,
  certificate_parent : number,
  certificate_identity : number,
  certificate_picture : number,
  certificate_logo : number,
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