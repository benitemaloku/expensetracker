import React, { useContext } from 'react';
import UserProvider, { UserContext } from '../../context/UserProvider';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    if (user === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user ? (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className='grow mx-5'>{children}</div>
                </div>
            ) : (
                <p className='text-center mt-10'></p>
            )}
        </div>
    );
};

export default DashboardLayout;
