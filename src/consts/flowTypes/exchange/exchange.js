export type exchangeType = {
  id: number,
  name: string,
  link: ?string,
  description: ?string,
  private: boolean,
  members_count: number,
  is_default_exchange: boolean,
  owner: {
    id: number,
    created_time: string,
    updated_time: string,
    child_name: string,
    name: string,
    accepted: boolean,
    mobile_verified: boolean,
    email_verified: boolean,
    identity_user: ?number,
    identity_organization: ?number
  },
  exchange_image: {
    id: number,
    file: string,
    create_time: string,
    info: string,
    identity: number,
    uploader: number
  },
  exchange_banner: ?number,
  exchange_hashtag: ?number
}