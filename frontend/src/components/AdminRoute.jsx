import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
	const { userInfo } = useSelector((state) => state.auth);

	// If user logged in continue to the next route, otherwise redirect to login
	return userInfo && userInfo.isAdmin ? (
		<Outlet />
	) : (
		<Navigate to='/login' replace />
	);
};

export default AdminRoute;
