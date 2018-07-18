// @flow
import * as React from "react"
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type ProductRatingProps = {
    translator: TranslatorType
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