import React from 'react'
import SideMenu from '../layouts/SideMenu';
import { getInitials } from '../../utils/helper';

export const CharAvatar = ({fullName, width, height, styles}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${styles || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInitials(fullName || "")}
    </div>
  )
};

export default CharAvatar;
