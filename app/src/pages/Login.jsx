import { Box, FormControl, FormLabel, Text, Input, Checkbox, Button, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';

const Login = () => {
	const [check, setCheck] = useState(false);
	const { token } = useSelector(state => state.auth);
	const navigate = useNavigate();
	const { login } = useApi();

	useEffect(() => {
		if (token) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = {};
		let formData = new FormData(event.target).entries();
		for (let pair of formData)
			data[pair[0]] = pair[1];

		login(data).then(res => {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}).catch(err => {
			alert(err);
		})
	}

	return (
		<Box h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
			<Stack dir='row' spacing={'10'}>
				<Text fontSize={'20'} fontWeight={'600'}>Login</Text>
				<form onSubmit={handleSubmit}>
					<Stack justify={'center'} align={'center'}>
						<FormControl>
							<FormLabel>Username</FormLabel>
							<Input type='text' name='username' id='username' />
						</FormControl>
						<FormControl mb={'8'}>
							<FormLabel>Password</FormLabel>
							<Input type='password' name='password' id='password' />
						</FormControl>
						<Box display={'flex'} w={'100%'} justifyContent={'start'}>
							<Checkbox onChange={(event) => setCheck(prev => !prev)}>Remember me</Checkbox>
						</Box>
						<Button disabled={!check} colorScheme={'blue'} w={'fit-content'} type='submit'>Login</Button>
						<Text>Don't have an account? <Link to='/register'>Register</Link></Text>
					</Stack>
				</form>
			</Stack>
		</Box>
	)
}

export default Login