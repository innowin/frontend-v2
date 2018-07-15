export type shortOrganizationType = {
  id: number,
  owner: {
    id: number,
    username: string,
    first_name: ?string,
    last_name: ?string,
    email: ?string
  },
  admins: [],
  username: string,
  email: string,
  nike_name: ?string,
  official_name: string,
  national_code: ?string,
  meta_data: []
}

export type organizationType = {
  id: number,
  owner: {
    id: number,
    username: string,
    first_name: ?string,
    last_name: ?string,
    email: ?string
  },
  admins: [],
  username: string,
  email: ?string,
  nike_name: ?string,
  official_name: string,
  national_code: ?string,
  meta_data: [],
  public_email: ?string,
  registration_ads_url: ?string,
  registrar_organization: ?string,
  country: ?string,
  province: ?string,
  city: ?string,
  address: ?string,
  phone: (string)[],
  web_site: ?string,
  established_year: ?string,
  ownership_type: string,
  business_type: (string)[],
  biography: ?string,
  description: ?string,
  correspondence_language: (string)[],
  social_network: (string)[],
  staff_count: ?number,
  active_flag: boolean,
  owner: number,
  organization_logo: ?number,
  organization_banner: ?number
}
