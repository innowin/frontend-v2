import * as React from "react";

export default {
  USER_TYPES: {
    PERSON: 'person',
    ORG: 'org',
  },
  POST_PARENT: {
    EXCHANGE: 'exchange'
  },
  PRODUCT: {
    PRICE_TYPE: {
      SPECIFIED: 'specified',
      CALL: 'call',
    }
  },
  POST: {
    POST_TYPE: {
      POST: 'post',
      SUPPLY: 'supply',
      DEMAND: 'demand',
    }
  },
  COMMENT_PARENT: {
    POST: 'post',
  },
  LINKS: {
    TELEGRAM: 'https://t.me/',
    INSTAGRAM: 'https://www.instagram.com/',
    YOUTUBE: 'https://www.youtube.com/channel/',
    LINKEDIN: 'https://www.linkedin.com/in/',
  },
  SERVER_GRADES: {
    BACHELOR: 'Bachelor',
    MASTER: 'Master',
    PHD: 'Phd',
  },
  TAG_FILTERS: {
    FINANCIAL: 'financial',
    COMMERCE: 'commerce',
    CONFIRMATION: 'confirmation',
    HOME: 'home',
    HEALTHCARE: 'healthcare',
  }
}