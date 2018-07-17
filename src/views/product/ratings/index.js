// @flow
import * as React from "react"
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"

type ProductRatingProps = {
    translator: {[string]: string}
}

const ProductRating = (props: ProductRatingProps) => {
    const {translator} = props
    return (
        <div>
            <CategoryTitle
                title={translator['Ratings']}
            />
            <FrameCard className="-frameCardPost">
                <ListGroup>
                    <p>Product Ratings</p>
                </ListGroup>
            </FrameCard>
        </div>
    )
}
export default ProductRating