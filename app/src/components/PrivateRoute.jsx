import { Box, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import useApi from '../hooks/useApi';
import HomeWrapper from './HomeWrapper';

const PrivateRoute = () => {
	const { user, token } = useSelector(state => state.auth);
	const { getUser } = useApi();

	useEffect(() => {
		if (token) {
			getUser().then(res => {
				<Navigate to={'/'} />
			}).catch(err => {
				<Navigate to={'/login'} />
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);


	if (user) {
		return <Outlet />
	} else if (token) {
		console.log('Loading....');
		return (
			<HomeWrapper>
				<Box h={'90vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Spinner />
				</Box>
			</HomeWrapper>)
	} else {
		return <Navigate to={'/login'} />
	}


}

export default PrivateRoute