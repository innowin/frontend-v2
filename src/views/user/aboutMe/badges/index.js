import React from 'react'
import CardContainer from '../../../common/cardContainer'

const Badges = (props) => {
  const {badges} = props
  const badgesImg = badges.map(badge => !badge ? '' : badge.badge_related_badge_category.badge_related_media.file)
  const chosenBadgesImg = badgesImg.slice(0, 4)
  return (
      <CardContainer>
        <div className="card-header">
          <div className="header-title">
            نشان ها
          </div>
        </div>

        <div className="content">
          {
            chosenBadgesImg.length > 0 &&
            <div className="badgesCard">
              {
                chosenBadgesImg.map((badgeImg, i) =>
                    <img key={i + 'badge'} src={badgeImg} alt=""/>,
                )
              }
            </div>
          }
        </div>
      </CardContainer>
  )
}

export default Badges