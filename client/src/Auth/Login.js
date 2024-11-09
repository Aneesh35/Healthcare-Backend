// //This is the login front and back end integration code
// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'universal-cookie';

// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Girl from '../asset/signin_girl.png';
// import './Login.css?v=1';
// const cookies = new Cookies();

// const Login = () => {
// 	const refEmail = useRef('');
// 	const refPassword = useRef('');
// 	const navigate = useNavigate();
// 	const [passwordShown, setPasswordShown] = useState(false);
// 	const [error, setError] = useState();

// 	const togglePassword = () => {
// 		setPasswordShown(!passwordShown);
// 	};

// 	const handleClick = async () => {
// 		try {
// 			let axiosConfig = {
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			};

// 			let postData = {
// 				email: refEmail.current.value,
// 				password: refPassword.current.value,
// 			};

// 			axios.post(`/api/auth/login`, postData, axiosConfig).then(
// 				(response) => {
// 					console.log(response);
// 					if (response.data.role === 'patient') {
// 						navigate('/record-checker', { replace: true });
// 					} else {
// 						navigate('/dhome', { replace: true });
// 					}
// 				},
// 				(reason) => {
// 					console.error(reason);
// 					setError('Invalid Email or Password!');
// 				}
// 			);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<>
// 			<Navbar />
// 			<div className='LoginWrapper'>
// 				<div className='LoginContainer'>
// 					<div className='LoginInfo'>
// 						<b>Sign in to</b>
// 						<span class='eldercare'>
// 							<span>E</span>
// 							<span>l</span>
// 							<span>d</span>
// 							<span>e</span>
// 							<span>r</span>
// 							<span>C</span>
// 							<span>a</span>
// 							<span>r</span>
// 							<span>e</span>
// 						</span>
// 						<c>
// 							<p>Don't have an account yet?</p>
// 							<d>Create an account</d>
// 							<a href='/register' className='register'>
// 								{' '}
// 								here!
// 							</a>
// 						</c>
// 					</div>
// 					<div className='girl'>
// 						<img className='girl' src={Girl} alt='girl'></img>
// 					</div>
// 					<div className='Login'>
// 						<h1>Sign in</h1>
// 						<input
// 							className='credentials'
// 							ref={refEmail}
// 							type='text'
// 							name='email'
// 							placeholder='Enter Email'
// 						/>
// 						<div className='credentials'>
// 							<input
// 								className='password'
// 								ref={refPassword}
// 								type={passwordShown ? 'text' : 'password'}
// 								name='password'
// 								placeholder='Password'
// 							/>
// 							<button className='showPass' onClick={togglePassword}>
// 								<i class='gg-eye'></i>
// 							</button>
// 						</div>
// 						<a href='forget_password_url' className='forgetPass'>
// 							Forgot your password?
// 						</a>
// 						<button className='loginButton' onClick={handleClick}>
// 							Log in
// 						</button>
// 						{error ? <div>{error}</div> : null}
// 					</div>
// 				</div>
// 			</div>
// 			<Footer />
// 		</>
// 	);
// };

// export default Login;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer';
import Girl from '../asset/signin.png';
import './Login.css';
const cookies = new Cookies();

const Login = () => {
	const refEmail = useRef('');
	const refPassword = useRef('');
	const navigate = useNavigate();
	const [passwordShown, setPasswordShown] = useState(false);
	const [error, setError] = useState();

	const togglePassword = () => setPasswordShown(!passwordShown);

	const handleClick = async () => {
		try {
			const postData = {
				email: refEmail.current.value,
				password: refPassword.current.value,
			};

			axios.post(`/api/auth/login`, postData, {
				headers: { 'Content-Type': 'application/json' },
			})
				.then((response) => {
					if (response.data.role === 'patient') navigate('/record-checker', { replace: true });
					else navigate('/dhome', { replace: true });
				})
				.catch(() => setError('Invalid Email or Password!'));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			<div className='LoginWrapper'>
				<div className='LoginContainer'>
					<div className='LoginContent'>
						<h2 className='title'>Sign in to CareConnect</h2>
						<p>Don't have an account yet? <a href='/register' className='registerLink'>Register here!</a></p>
						<input ref={refEmail} type='text' name='email' placeholder='Enter Email' className='inputField' />
						{/* <div className='inputField passwordField'> */}
							<input ref={refPassword} type={passwordShown ? 'text' : 'password'} name='password' placeholder='Password' className='inputField' />
							{/* <button onClick={togglePassword} className='showPass'><i className='gg-eye'></i></button> */}
						{/* </div> */}
						<a href='/forgot-password' className='forgotPassword'>Forgot your password?</a>
						<button className='loginButton' onClick={handleClick}>Log in</button>
						{error && <div className='errorMessage'>{error}</div>}
					</div>
					<div className='Illustration'>
						<img src={Girl} alt='illustration' />
					</div>
				</div>
			</div>
			{/* <Footer /> */}
		</>
	);
};

export default Login;
