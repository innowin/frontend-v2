import {StatusClose, StatusHire, StatusIntern, StatusPartTime} from "../images/icons"
import React from "react"

export default {
  TOP_BAR_PAGES: {
    EXCHANGE_EXPLORER: "/exchanges/exchange_explorer",
    USER_EXPLORER: "/users/user_explorer",
    PRODUCT: "/product/",
    HOME: "/",
    OTHER: "other",
  },
  USER_TYPES: {
    ORG: "organization",
    USER: "user",
  },
  POST_PARENT: {
    EXCHANGE: "exchange",
  },
  FILE_PARENT: {
    POST: "post",
    EXCHANGE: "exchange",
    PRODUCT: "product",
    PROFILE: "profile",
    IDENTITY: "identity",
    CERTIFICATE: "certificate",
  },
  PRODUCT: {
    PRICE_TYPE: {
      SPECIFIED: "specified",
      CALL: "call",
    },
  },
  POST: {
    POST_TYPE: {
      POST: "post",
      SUPPLY: "supply",
      DEMAND: "demand",
    },
  },
  GENDER: {
    MALE: "male",
    FEMALE: "female",
  },
  COMMENT_PARENT: {
    POST: "post",
  },
  LINKS: {
    TELEGRAM: "https://t.me/",
    INSTAGRAM: "https://www.instagram.com/",
    TWITTER: "https://www.twitter.com/",
    LINKEDIN: "https://www.linkedin.com/in/",
    LINKEDIN_START: "www.linkedin.com",
  },
  SERVER_GRADES: {
    BACHELOR: "Bachelor",
    MASTER: "Master",
    PHD: "Phd",
  },
  SERVER_LEVELS: {
    VERY_LOW: "1",
    LOW: "2",
    MEDIUM: "3",
    GOOD: "4",
    VERY_GOOD: "5",
  },
  TAG_FILTERS: {
    FINANCIAL: "financial",
    COMMERCE: "commerce",
    CONFIRMATION: "confirmation",
    HOME: "home",
    HEALTHCARE: "healthcare",
  },
  FILE_TYPE: {
    PHOTO: ["jpg", "jpeg", "png"],
    FILE: ["pdf", "xlsx", "doc", "docx"],
    VIDEO: ["mp4"],
    AUDIO: ["mp3"],
  },
  RESET_PASSWORD_STEP: {
    REQUEST: "request_step",
    CHECK_CODE: "check_code_step",
    RESET: "reset_step",
  },
  TOAST_TYPE: {
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    ERROR: "error",
  },
  ERRORS: {
    USER_SEARCH: {
      NOT_FOUND: "NOT_FOUND", // user not found
    },
    PASSWORD_RECOVERY_BY_EMAIL: {
      USER_NOT_FOUND: "User not found",
    },
  },
  SUCCESS_MESSAGES: {
    SUCCESS: "SUCCESS",
    OK: "OK",
    CODE_SENDED: "code sended",
  },
  STATISTICS: {
    SUPPLY: "عرضه",
    DEMAND: "تقاضا",
    MEMBERS: "اعضا",
  },
  CREATE_FILE_TYPES: {
    IMAGE: "image",
    FILE: "file",
    VIDEO: "video",
  },
  CREATE_FILE_CATEGORIES: {
    EVENT: "event",
    ORGAN_PROFILE: {
      CATALOG: "catalog",
    },
    PROFILE: {
      BANNER: "banner",
      PROFILE_PICTURE: "profile-picture",
      RESUME: "resume",
    },
    IDENTITY: {
      BANNER: "banner",
      PROFILE_PICTURE: "profile-picture",
    },
    POST: {
      IMAGE: "image",
      VIDEO: "video",
      FILE: "file",
    },
    EXCHANGE: {
      IMAGE: "exchange-image",
    },
    PRODUCT: {
      IMAGE: "product-image",
    },
    CERTIFICATE: {
      PICTURE: "certificate-picture",
    },
  },
  TEMP_FILE_KEYS: {
    CATALOG: "organCatalog",
    RESUME: "profileResume",
    CERTIFICATE: {
      PICTURE: "certificatePicture",
      LOGO: "certificateLogo",
    },
  },
  WORK_STATUS: {
    EMPLOYED: "employed",
    SEARCH_FOR_A_BETTER_JOB: "search_for_a_better_job",
    UNEMPLOYED: "unemployed",
  },
  WORK_STATUS_FA: {
    EMPLOYED: "شاغل",
    SEARCH_FOR_A_BETTER_JOB: "در جستجوی کار بهتر",
    UNEMPLOYED: "بیکار",
  },
  MILITARY_SERVING_STATUS: {
    EDUCATION_PARDON: "education_pardon",
    APPLYING: "applying",
    SERVING: "serving",
    THE_END_OF_SERVING: "the_end_of_serving",
    PERMANENT_EXEMPTION: "permanent_exemption",
  },
  MILITARY_SERVING_STATUS_FA: {
    EDUCATION_PARDON: "معافیت تحصیلی",
    APPLYING: "در حال اعزام",
    SERVING: "در حال خدمت",
    THE_END_OF_SERVING: "انجام شده",
    PERMANENT_EXEMPTION: "معافیت دائم",
  },
  PROFILE_STATUS: {
    USER: {
      "to_get_hired": {name: "to_get_hired", icon: <StatusHire className='user-profile-status status-hire'/>, buttonClass: "status-hire-class"},
      "full_time_hiring": {
        name: "full_time_hiring",
        icon: <StatusPartTime className='user-profile-status status-full-time'/>,
        buttonClass: "status-full-time-class",
      },
      "part_time_hiring": {
        name: "part_time_hiring",
        icon: <StatusPartTime className='user-profile-status status-part-time'/>,
        buttonClass: "status-part-time-class",
      },
      "internship_hiring": {
        name: "internship_hiring",
        icon: <StatusIntern className='user-profile-status status-intern'/>,
        buttonClass: "status-intern-class",
      },
      "not_interested_to_job": {
        name: "not_interested_to_job",
        icon: <StatusClose className='user-profile-status status-close'/>,
        buttonClass: "status-close-class",
      },
    },
    ORG: {
      "hire": {name: "hire", icon: <StatusHire className='user-profile-status status-hire'/>, buttonClass: "status-hire-class"},
      "full_time_hire": {
        name: "full_time_hire",
        icon: <StatusPartTime className='user-profile-status status-full-time'/>,
        buttonClass: "status-full-time-class",
      },
      "part_time_hire": {
        name: "part_time_hire",
        icon: <StatusPartTime className='user-profile-status status-part-time'/>,
        buttonClass: "status-part-time-class",
      },
      "internship_hire": {
        name: "internship_hire",
        icon: <StatusIntern className='user-profile-status status-intern'/>,
        buttonClass: "status-intern-class",
      },
      "not_hiring": {name: "not_hiring", icon: <StatusClose className='user-profile-status status-close'/>, buttonClass: "status-close-class"},
    },
  },
}