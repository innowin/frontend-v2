export type exchangeType = {|
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
  exchange_image: ?{
    id: number,
    file: string,
    create_time: string,
    info: string,
    identity: ?number,
    uploader: number
  },
  exchange_banner: ?{
    id: number,
    file: string,
    create_time: string,
    info: string,
    identity: ?number,
    uploader: number
  },
  // FixME mohsen = exchange_hashtag is numbber or object??
  exchange_hashtag: ?number
|}

export type exchangeIdentityType = {|
  id: number,
  exchange_identity_related_exchange: {
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
    exchange_image: ?{
      id: number,
      file: string,
      create_time: string,
      info: string,
      identity: ?number,
      uploader: number
    },
    exchange_banner: ?{
      id: number,
      file: string,
      create_time: string,
      info: string,
      identity: ?number,
      uploader: number
    },
    // FixME mohsen = exchange_hashtag is numbber or object??
    exchange_hashtag: ?number
  },
  exchange_identity_related_identity: {
    id: number,
    identity_user: ?{
      id: number,
      username: string,
      first_name: ?string,
      last_name: ?string,
      email: ?string
    },
    created_time: string,
    child_name: string,
    name: string,
    accepted: boolean,
    mobile_verified: boolean,
    email_verified: boolean,
    identity_organization: ?{
      owner: number,
      username: string,
      email: ?string,
      official_name: string,
      ownership_type: string,
      business_type: string
    }
  },
  created_time: string,
  join_type: string,
  active_flag: boolean
|}
