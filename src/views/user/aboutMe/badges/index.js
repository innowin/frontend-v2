import React from "react"
import CardContainer from "../../../common/cardContainer"

const Badges = (props) => {
  const {badges} = props
  return (
      <CardContainer>
        <div className="card-header">
          <div className="header-title">
            نشان
          </div>
        </div>

        <div className="content">
          {
            badges.map((badge, i) =>
                <div key={"badge" + i} className="badgesCard">
                  <div className='badge-instant-logo'>
                    <img src={badge.badge_related_badge_category.badge_related_media && badge.badge_related_badge_category.badge_related_media.file}
                         alt=''/>
                    <div style={{marginTop: "5px"}}>{badge.badge_related_badge_category.badge_title}</div>
                  </div>
                  <div className='badge-instant-text'>
                    <div>{badge.badge_related_badge_category.badge_title}</div>
                    <div className='badge-instant-text-desc'>{badge.badge_related_badge_category.badge_description}</div>
                  </div>
                </div>,
            )
          }
        </div>
      </CardContainer>
  )
}

export default Badges