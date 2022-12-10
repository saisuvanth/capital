import { Avatar, Box, Button, CloseButton, Drawer, DrawerContent, DrawerOverlay, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import useApi from '../hooks/useApi';
import { setShow } from '../store/authReducer';

const Navbar = () => {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { logout } = useApi();
	const handleClick = () => {
		dispatch(setShow(true));
	}

	return (
		<Box>
			<Flex maxH={24} align='center' px={'30'} pt={'25'}>
				<Button display={{ md: 'none' }} onClick={onOpen}>
					<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-menu'><line x1='3' y1='12' x2='21' y2='12'></line><line x1='3' y1='6' x2='21' y2='6'></line><line x1='3' y1='18' x2='21' y2='18'></line></svg>
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='left'
					onClose={onClose}
					size={'xs'}
				>
					<DrawerOverlay />
					<DrawerContent pt={10}>
						<CloseButton w={'100%'} pr={8} pb={5} sx={{ display: 'flex', justifyContent: 'end' }} onClick={onClose} />
						<Stack
							as={'nav'}
							spacing={4}
							align={'center'}
						>
							<Link href='/'>Home</Link>
							<Link href='/my-items'>My Items</Link>
							<Link href='/purchases'>Purchases</Link>
						</Stack>
					</DrawerContent>
				</Drawer>
				<Text fontSize={'20'} fontWeight={'600'}>We-LX</Text>
				<Flex align={'start'} flexGrow={'2'} pl='50' display={{ base: 'none', md: 'flex' }}>
					<Stack direction={'row'} spacing='8'>
						<Link href='/'>Home</Link>
						<Link href='/my-items'>My Items</Link>
						<Link href='/purchases'>Purchases</Link>
					</Stack>
				</Flex>
				<Flex align={'center'} justify={'end'} flexGrow={2}>
					<Button colorScheme={'green'} onClick={handleClick} mr={'10'}>
						<Text>Sell an Item</Text>
					</Button>
					<Menu>
						<MenuButton>
							<Avatar name='hehe' size={'sm'} src='https://bit.ly/dan-abramov' />
						</MenuButton>
						<MenuList>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</Box>
	)
}

export default Navbar