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
    LINKEDIN_START: 'www.linkedin.com',
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
  },
  FILE_TYPE: {
    PHOTO: ['jpg', 'jpeg', 'png'],
    FILE: ['pdf', 'xlsx', 'doc', 'docx'],
    VIDEO: ['mp4'],
    AUDIO: ['mp3']
  },
  RESET_PASSWORD_STEP: {
    REQUEST: 'request_step',
    CHECK_CODE: 'check_code_step',
    RESET: 'reset_step'
  },
  TOAST_TYPE: {
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    ERROR: 'error',
  },
  ERRORS: {
    USER_SEARCH: {
      NOT_FOUND: 'NOT_FOUND', // user not found
    },

  }
}