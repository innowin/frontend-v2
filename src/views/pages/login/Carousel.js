import React, {Component} from 'react';

const Carousel1 = () => {
	return (
			<div>
				<h2>بازار یابی</h2>
				<p>اکوسیستم دانش بنیان با بستر بورس و دانش نخبگان</p>
			</div>
	)
};
const Carousel2 = () => {
	return (
			<div>
				<h2>بازارگردانی</h2>
				<p>شیکه ارتباطی تسهیلگر</p>
			</div>
	)
};
const Carousel3 = () => {
	return (
			<div>
				<h2>بازار سازی</h2>
				<p>با استفاده از امکانات بین المللی</p>
			</div>
	)
};

class CarouselLogin extends Component {
  constructor (props) {
    super(props);
    this.state = {
    	slides:[1,2,3],
    	active: 1,
		}
  }
  
  render () {
		return (
      <div className=" carousel-wrapper">
				<Carousel1/>
				<Carousel2/>
				<Carousel3/>
      </div>
		)
  }
}

export default CarouselLogin;