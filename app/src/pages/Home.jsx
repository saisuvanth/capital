import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import HomeWrapper from '../components/HomeWrapper';
import useApi from '../hooks/useApi';
import { setItems } from '../store/authReducer';
import Card from '../components/Card';

const Home = () => {
	const { getItems } = useApi();
	const dispatch = useDispatch();
	const { items } = useSelector(state => state.auth);

	useEffect(() => {
		getItems().then(res => {
			console.log(res)
			dispatch(setItems(res));
		})
	}, []);

	return (
		<HomeWrapper>
			<Box mt={'10'} mx={'10'}>
				<SimpleGrid columns={[1, 2, 3, 3, 4]} gap={'6'} >
					{items?.map((item, index) => (
						<GridItem key={index}>
							<Card item={item} />
						</GridItem>
					))}
				</SimpleGrid>
			</Box>
		</HomeWrapper>
	)
}

export default Home