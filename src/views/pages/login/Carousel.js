import React, { Component } from 'react'
import uuid from 'uuid'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// main component
class CarouselLogin extends Component {
    constructor() {
        super()
        this.state = {
			slides: [
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
		}
	}
	componentDidMount() {
		this._contentHandler(this.state.slides[0].id) //  the first content setting
		setTimeout(() => this.setState({ ...this.state, showSlide: true }), 10) // set showSlide: true after 10ms
	 }
	 
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	_contentHandler = (id) => {
		clearInterval(this.interval) // first clearing past interval
		const { slides } = this.state
		this.setState({ ...this.state, activeId: id, showSlide: false })
		let index = slides.findIndex(slide => slide.id === id)
		if (index === slides.length -1) index = 0
		else index++
		this.interval = setInterval(this._contentHandler, 5000, slides[index].id) // set new interval
	}

	render() {
        const { slides, activeId, showSlide } = this.state
        return (
            <div className="carousel-wrapper">
				<BtnBar activeId={activeId} slides={slides} handler={this._contentHandler} />
					<div>
						<TransitionGroup>
							{slides.map(slide => (slide.id === activeId ?
								// <---------------- slide
								<CSSTransition // start of next slide entering is onExited the prev slide.
									key={`content${slide.id}`}
									in={slide.id === activeId}
									timeout={1000}
									classNames="login-slide"
									unmountOnExit
									onExited={() => this.setState({ ...this.state, showSlide: true})}
								>
									<div className="login-slide">
										<CSSTransition
											in={showSlide}
											timeout={1000}
											classNames="login-slide"
											unmountOnExit
										>
											{
												status => (
													<div className="content">
														<CSSTransition // when the slide is entered header of slide start entering 
															in={status === 'entered'}
															timeout={400}
															classNames="login-slide-header"
															unmountOnExit
														>	
															<header>{slide.header}</header>		
														</CSSTransition>
														<br />
														<p>{slide.desc}</p>
													</div>
												)
											}
										</CSSTransition>
									</div>
								</CSSTransition>
								:
								''
								) 
								// slide ------------------->
							)}

						</TransitionGroup>
					</div>
            </div>
        )
    }
}

// slide show controle btn bar
const BtnBar = ({ slides, activeId, handler }) => (
	<div className="carousel-btn-bar">
		<ul>
			{slides.map(slide => 
				<li key={`btn${slide.id}`}>
					<i
						onClick={handler.bind(null, slide.id)}
						className={
							activeId === slide.id ? 'fa fa-circle'
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