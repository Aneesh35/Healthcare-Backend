// import React, { useState } from 'react';
// // import Logo from '../../asset/eldercare.jpg';
// import { CgProfile } from 'react-icons/cg';
// import axios from 'axios';

// import './Navbar.css';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({ role }) => {
// 	const navigate = useNavigate();
// 	const logout = () => {
// 		axios.post(`/api/auth/logout`).then((response) => {
// 			console.log(response);
// 		});

// 		navigate('/');
// 	};

// 	//Doctor Navbar
// 	if (role === 'doctor') {
// 		return (
// 			<div className='row'>
// 				<nav className='nav'>
// 					<div className='navWrapper'>
// 						<div className='navLogo'>
// 							{/* <img src={Logo} alt='Logo' /> */}
// 							<h2>CareConnect</h2>
// 						</div>
// 						<ul className='navList'>
// 							<li className='navItem'>
// 								<a className='listItem' href='/dhome'>
// 									Appointments
// 								</a>
// 							</li>
// 							<li className='navItem'>
// 								<a className='listItem' href='/dashboard'>
// 									Dashboard
// 								</a>
// 							</li>

// 							<li className='navItem'>
// 								<a className='listItem' href='/dmed/accept'>
// 									Accept Meds
// 								</a>
// 							</li>

// 							<li className='navItem'>
// 								<a className='listItem'>
// 									<div class='navigation'>
// 										<CgProfile size={25} />
// 										<div class='navigation-content'>
// 											<a href='/profile'>Profile</a>
// 											<a href='#' onClick={logout}>
// 												Log Out
// 											</a>
// 										</div>
// 									</div>
// 								</a>
// 							</li>
// 						</ul>
// 					</div>
// 				</nav>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className='row'>
// 				<nav className='nav'>
// 					<div className='navWrapper'>
// 						<div className='navLogo'>
// 						<h2>CareConnect</h2>
// 							{/* <img src={Logo} alt='Logo' /> */}
// 						</div>
// 						{/* <ul className='navList'>
// 							<li className='navItem'>
// 								<a className='listItem' href='/phome'>
// 									Home
// 								</a>
// 							</li>

// 							<li className='navItem'>
// 								<a className='listItem' href='/patient/appointment'>
// 									Appointments
// 								</a>
// 							</li>
// 							<li className='navItem'>
// 								<a className='listItem' href='/pmed/status'>
// 									Med Orders
// 								</a>
// 							</li>
// 							<li className='navItem'>
// 								<a className='listItem' href='/symptoms-checker'>
// 									Symptoms
// 								</a>
// 							</li>

// 							<li className='navItem'>
// 								<a className='listItem'>
// 									<div class='navigation'>
// 										<CgProfile size={25} />
// 										<div class='navigation-content'>
// 											<a href='/profile'>Profile</a>
// 											<a href='#' onClick={logout}>
// 												Log Out
// 											</a>
// 										</div>
// 									</div>
// 								</a>
// 							</li>
// 						</ul> */}


// <ul className='navList'>
// 	<li className='navItem'>
// 		<a className='listItem' href='/phome'>
// 			Home
// 		</a>
// 	</li>

// 	<li className='navItem'>
// 		<a className='listItem' href='/patient/appointment'>
// 			Appointments
// 		</a>
// 	</li>
// 	<li className='navItem'>
// 		<a className='listItem' href='/pmed/status'>
// 			Med Orders
// 		</a>
// 	</li>
// 	<li className='navItem'>
// 		<a className='listItem' href='/symptoms-checker'>
// 			Symptoms
// 		</a>
// 	</li>
	
// 	{/* New Links for Medication Management */}
// 	<li className='navItem'>
// 		<a className='listItem' href='/patient/medications/add'>
// 			Add Medication
// 		</a>
// 	</li>
// 	<li className='navItem'>
// 		<a className='listItem' href='/patient/medications/update'>
// 			Update Medication
// 		</a>
// 	</li>
// 	<li className='navItem'>
// 		<a className='listItem' href='/patient/medications/all'>
// 			View All Medications
// 		</a>
// 	</li>

// 	<li className='navItem'>
// 		<a className='listItem'>
// 			<div class='navigation'>
// 				<CgProfile size={25} />
// 				<div class='navigation-content'>
// 					<a href='/profile'>Profile</a>
// 					<a href='#' onClick={logout}>
// 						Log Out
// 					</a>
// 				</div>
// 			</div>
// 		</a>
// 	</li>
// </ul>

// 					</div>
// 				</nav>
// 			</div>
// 		);
// 	}
// };

// export default Navbar;






import React from 'react';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role }) => {
    const navigate = useNavigate();
    
    const logout = () => {
        axios.post(`/api/auth/logout`).then((response) => {
            console.log(response);
        });
        navigate('/');
    };

    if (role === 'doctor') {
        return (
            <div className='row'>
                <nav className='nav'>
                    <div className='navWrapper'>
                        <div className='navLogo'>
                            <h2>CareConnect</h2>
                        </div>
                        <ul className='navList'>
                            <li className='navItem'>
                                <a className='listItem' href='/dhome'>
                                    Appointments
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem' href='/dashboard'>
                                    Dashboard
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem' href='/dmed/accept'>
                                    Accept Meds
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem'>
                                    <div className='navigation'>
                                        <CgProfile size={25} />
                                        <div className='navigation-content'>
                                            <a href='/profile'>Profile</a>
                                            <a href='#' onClick={logout}>
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    } else {
        return (
            <div className='row'>
                <nav className='nav'>
                    <div className='navWrapper'>
                        <div className='navLogo'>
                            <h2>CareConnect</h2>
                        </div>
                        <ul className='navList'>
                            <li className='navItem'>
                                <a className='listItem' href='/phome'>
                                    Home
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem' href='/patient/appointment'>
                                    Appointments
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem' href='/pmed/status'>
                                    Med Orders
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem' href='/symptoms-checker'>
                                    Symptoms
                                </a>
                            </li>
                            {/* New Medication Management Links */}
                            <li className='navItem'>
                                <a className='listItem' href='/patient/medications/add'>
                                    Add Medication
                                </a>
                            </li>
                            {/* <li className='navItem'>
                                <a className='listItem' href='/patient/medications/update'>
                                    Update Medication
                                </a>
                            </li> */}
                            <li className='navItem'>
                                <a className='listItem' href='/patient/medications/all'>
                                    View All Medications
                                </a>
                            </li>
                            <li className='navItem'>
                                <a className='listItem'>
                                    <div className='navigation'>
                                        <CgProfile size={25} />
                                        <div className='navigation-content'>
                                            <a href='/profile'>Profile</a>
                                            <a href='#' onClick={logout}>
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
};

export default Navbar;
