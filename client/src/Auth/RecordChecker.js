import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Navbar from '../Components/patient/Navbar';
import Footer from '../Components/patient/Footer';
import PatientHome from '../Components/patient/PatientHome';
import { AiOutlineArrowDown } from 'react-icons/ai';

import './RecordChecker.css';
const RecordChecker = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			axios.get(`/api/auth/check`).then((response) => {
				console.log(response.data);
				axios
					.get(`/api/record/id/${response.data.id}`)
					.then((response) => {
						if (response.status === 200) navigate('/phome', { replace: true });
					})
					.catch(setIsLoading(false));
			});
		};
		fetchData();
	}, []);
	return (
		<>
			{isLoading === true ? (
				<ClipLoader color='#36d7b7' />
			) : (
				<div className='record-whole-wrapper'>
					<div className='record-overlay'>
						<div className='arrow bounce'>
							<AiOutlineArrowDown color='black' size={70} />
						</div>
					</div>
					<Navbar role={'patient'} />
					<div className='headerWrapper'>
						<div className='headerContainer'>
							<div className='headerLeft'>
								<h1>Update your profile to get started!</h1>
								<p>
									CareConnect engages with various healthcar partners to bring you <br />
									the best possible healthcare for kids of all ages and adults of all
									conditions.
								</p>
							</div>
							<div className='headerRight'></div>
						</div>
					</div>
					<div className='recordContainer'>
						<div className='recordContent'>
							<button
								className='headerBtn'
								onClick={() => {
									navigate('/profile');
								}}
							>
								Go To Profile
							</button>
						</div>
					</div>
					<Footer />
				</div>
			)}
		</>
	);
};

export default RecordChecker;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ClipLoader from 'react-spinners/ClipLoader';
// import Navbar from '../Components/patient/Navbar';
// import Footer from '../Components/patient/Footer';
// import { AiOutlineArrowDown } from 'react-icons/ai';

// import './RecordChecker.css';

// const RecordChecker = () => {
// 	const navigate = useNavigate();
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const authResponse = await axios.get(`/api/auth/check`);
// 				const recordResponse = await axios.get(`/api/record/id/${authResponse.data.id}`);
// 				if (recordResponse.status === 200) {
// 					navigate('/phome', { replace: true });
// 				}
// 			} catch (error) {
// 				setIsLoading(false);
// 			}
// 		};
// 		fetchData();
// 	}, [navigate]);

// 	return (
// 		<>
// 			{isLoading ? (
// 				<div className='loader-wrapper'>
// 					<ClipLoader color='#5DB5A4' size={70} />
// 				</div>
// 			) : (
// 				<div className='record-whole-wrapper'>
// 					<Navbar role={'patient'} />
// 					<div className='headerWrapper'>
// 						<div className='headerContainer'>
// 							<div className='headerLeft'>
// 								<h1>Welcome to ElderCare</h1>
// 								<p>
// 									Update your profile to get personalized healthcare services
// 									<br />
// 									designed to support patients of all ages.
// 								</p>
// 							</div>
// 							<div className='headerRight'>
// 								<div className='arrow bounce'>
// 									<AiOutlineArrowDown color='#5DB5A4' size={60} />
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className='recordContainer'>
// 						<div className='recordContent'>
// 							<button
// 								className='updateProfileBtn'
// 								onClick={() => navigate('/profile')}
// 							>
// 								Update Profile
// 							</button>
// 						</div>
// 					</div>
// 					<Footer />
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default RecordChecker;
