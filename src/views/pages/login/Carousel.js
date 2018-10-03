import React, { Component } from 'react'
import uuid from 'uuid'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import FontAwesome from 'react-fontawesome'

// main component
class CarouselLogin extends Component {
    constructor() {
        super()
        this.state = {
			slides: [
				{
					id: `login-slide-${uuid()}`,
					header: 'هویت تخصصی‌تان را تعریف کنید',
					desc: 'با اینوین هویت تخصصی‌تان را تعریف کنید',
				 },
				 {
					id: `login-slide-${uuid()}`,
					header: 'ارتباطات کاری‌تان را توسعه دهید',
					desc: 'با اینوین ارتباطات کاری‌تان را توسعه دهید',
				 },
				 {
					id: `login-slide-${uuid()}`,
					header: 'به پنجره حرفه‌ای‌ها وارد شوید',
					desc: 'با اینوین به پنجره حرفه‌ای‌ها وارد شوید',
				 },
			],
			activeId: 1,
			showSlide: false,
		}
	}
	componentDidMount() {
		this._contentHandler(this.state.slides[0].id) //  the first content setting
		setTimeout(() => this.setState({ ...this.state, showSlide: true }), 100) // set showSlide: true after 10ms
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
									<div>
										<CSSTransition
											in={showSlide}
											timeout={1000}
											classNames="login-slide"
											unmountOnExit
										>
											{
												status => (
													<div className="login-slide">
														<CSSTransition // when the slide is entered header of slide start entering 
															in={status === 'entering' || status === 'entered'}
															timeout={1000}
															classNames="login-slide-header"
															unmountOnExit
														>	
															<header className="login-slide-header">{slide.header}</header>		
														</CSSTransition>
														<br />
														<p className="login-slide-desc">{slide.desc}</p>
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
	<div className="carousel-btn-bar-wrapper">
		<ul>
			{slides.map(slide => 
				<li key={`btn${slide.id}`}>
					<FontAwesome 
						name={activeId === slide.id ? 'circle' : 'circle-o'}
						onClick={handler.bind(null, slide.id)}
						className="cursor-pointer"
					/>
				</li>
			)}
		</ul>
	</div>
)

export default CarouselLogin;
