import { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal as BaseModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setShow } from '../store/authReducer';
import useApi from '../hooks/useApi';

const Modal = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const { show } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const { addItems } = useApi();

	const handleClose = () => {
		dispatch(setShow(false));
	}

	const handleClick = (e) => {
		e.preventDefault();
		console.log(name, price);
		addItems({ name, price }).then(res => {

		}).catch(err => {
			alert(err);
		})
	}

	return (
		<BaseModal isOpen={show} onClose={handleClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Sell an Item</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form>
						<FormControl>
							<FormLabel>Item Name</FormLabel>
							<Input type={'text'} value={name} onChange={e => setName(e.target.value)} />
						</FormControl>
						<FormControl>
							<FormLabel>Item Price</FormLabel>
							<Input type={'number'} value={price} onChange={e => setPrice(e.target.value)} />
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme={'red'} onClick={handleClose} mr={'5'}>
						Close
					</Button>
					<Button colorScheme={'green'} onClick={handleClick}>
						Sell
					</Button>
				</ModalFooter>
			</ModalContent>
		</BaseModal>
	)
}

export default Modal