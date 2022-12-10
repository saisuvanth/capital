import { Box, GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import HomeWrapper from '../components/HomeWrapper'


const MyItems = () => {
	const { my_items } = useSelector(state => state.auth);

	return (
		<HomeWrapper>
			<Box mt={'10'} mx={'10'}>
				{my_items?.length === 0 && <h1>You have no items</h1>}
				<SimpleGrid columns={[1, 2, 3, 3, 4]} gap={'6'} >
					{my_items?.map((item, index) => (
						<GridItem key={index}>
							<Card item={item} my_item={true} />
						</GridItem>
					))}
				</SimpleGrid>
			</Box>
		</HomeWrapper>
	)
}

export default MyItems