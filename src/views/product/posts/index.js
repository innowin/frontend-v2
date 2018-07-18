// @flow
import * as React from "react"
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"

type ProductPostsProps = {
    translator: {[string]: string}
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