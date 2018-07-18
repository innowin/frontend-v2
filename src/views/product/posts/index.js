// @flow
import * as React from "react"
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type ProductPostsProps = {
    translator: TranslatorType
}

const ProductPosts = (props: ProductPostsProps) => {
    const {translator} = props
    return (
        <div>
            <CategoryTitle
                title={translator['Post']}
            />
            <FrameCard className="-frameCardPost">
                <ListGroup>
                    <p>Product Posts</p>
                </ListGroup>
            </FrameCard>
        </div>
    )
}
export default ProductPosts