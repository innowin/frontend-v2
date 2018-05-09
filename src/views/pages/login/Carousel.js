import React, { Component } from 'react'
import uuid from 'uuid'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class CarouselLogin extends Component {
    constructor() {
        super()
        this.state = {
			items: [
				{
					id: `login-slide-${uuid()}`,
					header: 'بازاریابی, بازارسازی و بازگردانی تخصصی در حوزه ملی و بین‌المللی۱',
					desc: 'این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.',
				 },
				 {
					id: `login-slide-${uuid()}`,
					header: 'بازاریابی, بازارسازی و بازگردانی تخصصی در حوزه ملی و بین‌المللی۲',
					desc: 'این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.',
				 },
				 {
					id: `login-slide-${uuid()}`,
					header: 'بازاریابی, بازارسازی و بازگردانی تخصصی در حوزه ملی و بین‌المللی۳',
					desc: 'این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.این توضیحات مربوط به یک آیتم خاص است.',
				 },
			],
			activeId: 1,
			showSlide: false,
			showDesc: false,
		}
	}
	componentDidMount() { this.setState({ ...this.state, activeId: this.state.items[0].id, showSlide: true }) }

	_contentHandler = (id) => this.setState({ ...this.state, activeId: id, showSlide: false }, () => console.log('f', this.state.show))

	render() {
        const { items, activeId, showSlide, showDesc } = this.state
        return (
            <div className="carousel-wrapper">
				<BtnBar activeId={activeId} items={items} handler={this._contentHandler} />
					<div>
						<TransitionGroup>
							{items.map(item => (item.id === activeId ? 
								<CSSTransition
									in={item.id === activeId}
									timeout={1000}
									classNames="login-slide"
									unmountOnExit
									onExited={() => this.setState({ ...this.state, showSlide: true, showDesc: false }, () => console.log('s', this.state.show))}
								>
									<div className="login-slide" key={`content${item.id}`}>
										<CSSTransition
											in={showSlide}
											timeout={1000}
											classNames="login-slide"
											unmountOnExit
											onEntered={() => this.setState({showDesc: true})}
										>
											<div className="content">
												<header>{item.header}</header>
												<br />
												<p>{item.desc}</p>
											</div>
											
										</CSSTransition>
									</div>
								</CSSTransition>
								:
								''
								) 
							)}
						</TransitionGroup>
					</div>
            </div>
        )
    }
}

const BtnBar = ({ items, activeId, handler }) => (
	<div className="carousel-btn-bar">
		<ul>
			{items.map(item => 
				<li key={`btn${item.id}`}>
					<i
						onClick={handler.bind(null, item.id)}
						className={
							activeId === item.id ? 'fa fa-circle'
							: 
							'fa fa-circle-o'
						} 
					/>
				</li>
			)}
		</ul>
	</div>
)

export default CarouselLogin;