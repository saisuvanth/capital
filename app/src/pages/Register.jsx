import { Box, FormControl, FormLabel, Text, Input, Checkbox, Button, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const Register = () => {
	const [check, setCheck] = useState(false);
	const { register } = useApi();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = {};
		let formData = new FormData(event.target).entries();
		for (let pair of formData)
			data[pair[0]] = pair[1];

		register(data).then(res => {
			navigate('/login');
		}).catch(err => {
			alert(err);
		})
	}

	return (
		<Box h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
			<Stack dir='row' spacing={'10'}>
				<Text fontSize={'20'} fontWeight={'600'}>Register</Text>
				<form onSubmit={handleSubmit}>
					<Stack justify={'center'} align={'center'}>
						<FormControl>
							<FormLabel>Username</FormLabel>
							<Input type='text' name='username' id='username' />
						</FormControl>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input type='email' name='email' id='email' />
						</FormControl>
						<FormControl mb={'8'}>
							<FormLabel>Password</FormLabel>
							<Input type='password' name='password' id='password' />
						</FormControl>
						<Box display={'flex'} w={'100%'} justifyContent={'start'}>
							<Checkbox onChange={(event) => setCheck(prev => !prev)}>Agree to our T&C</Checkbox>
						</Box>
						<Button disabled={!check} colorScheme={'blue'} w={'fit-content'} type='submit'>Register</Button>
						<Text>Have an account? <Link to='/register'>Login</Link></Text>
					</Stack>
				</form>
			</Stack>
		</Box>
	)
}

export default Register