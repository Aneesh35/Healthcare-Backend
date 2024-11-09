// import React from 'react';
// import './Footer.css';
// import { AiOutlineInstagram } from 'react-icons/ai';
// import { FiFacebook } from 'react-icons/fi';
// import { AiOutlineYoutube } from 'react-icons/ai';
// const Footer = () => {
// 	return (
// 		<>
// 			<div className='footerContainer'>
// 				<div className='footerWrapper'>
// 					<div className='footerLeft'>
// 						<span>
// 							<h3 className='firstTag'>Elder</h3>
// 							<h3>Care</h3>
// 						</span>
// 						<h5>
// 							ElderCare engages with various healthcar partners to bring you
// 							<br />
// 							the best possible healthcare for kids of all ages and adults of all
// 							conditions.{' '}
// 						</h5>
// 						<p>©2022 - ElderCare.</p>
// 					</div>
// 					<div className='footerRight'>
// 						<div className='iconWrapper'>
// 							<AiOutlineInstagram size={25} color={'white'} />
// 							<FiFacebook size={25} color={'white'} />
// 							<AiOutlineYoutube size={25} color={'white'} />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Footer;


import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<div className='footerContainer'>
			<div className='footerWrapper'>
				<div className='footerLeft'>
					<h3 className='footerBrand'>
						Elder<span>Care</span>
					</h3>
					<p className='footerDescription'>
						We strive to provide comprehensive, compassionate care for seniors. ElderCare is committed to partnering with leading healthcare providers to ensure a safe, healthy, and fulfilling life for your loved ones.
					</p>
					<p className='copyright'>©2024 ElderCare. All rights reserved.</p>
				</div>
				{/* <div className='footerRight'>
					<h4>Quick Links</h4>
					<ul className='footerLinks'>
						<li><a href='/about'>About Us</a></li>
						<li><a href='/services'>Services</a></li>
						<li><a href='/blog'>Blog</a></li>
						<li><a href='/contact'>Contact</a></li>
						<li><a href='/terms'>Terms & Conditions</a></li>
					</ul>
				</div> */}
			</div>
		</div>
	);
};

export default Footer;
