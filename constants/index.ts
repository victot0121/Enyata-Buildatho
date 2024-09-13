import { MdDashboard } from 'react-icons/md';
import { LuHeartHandshake } from "react-icons/lu";


export const SidebarLinks = [
    {
        Icon: MdDashboard,
        route: '/homePage/dashboard',
        label: 'Dashboard'
    },
    {
        Icon: LuHeartHandshake,
        route: '/homePage/buydata',
        label: 'Agreement',
    }
];
