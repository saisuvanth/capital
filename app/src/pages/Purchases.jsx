import { Box, Card, GridItem, SimpleGrid, CardHeader, CardBody, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import HomeWrapper from '../components/HomeWrapper'


const Purchases = () => {
	const { purchases } = useSelector(state => state.auth);

	return (
		<HomeWrapper>
			<Box mt={'10'} mx={'10'}>
				<SimpleGrid>
					{purchases?.map((purchase, index) => (
						<GridItem key={index}>
							<Card w={'18rem'} border={'1px solid white'} px={'5px'} py={'8px'} sx={{ borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;' }} >
								<CardHeader display={'flex'} flexDir={'column'} alignItems={'center'} p={'5px'}>
									<Image h={'44'} src='https://apollo-singapore.akamaized.net/v1/files/i6dok3jqvv9b1-IN/image;s=780x0;q=60' sx={{ borderRadius: '8px' }} />
									<Text w={'80%'} textAlign={'start'} fontSize={'20'} fontWeight={600}>
										{purchase.name}
									</Text>
								</CardHeader>
								<CardBody p={'5px'} pl={'8'} display={'flex'} flexDir={'row'} alignItems={'center'}>
									Price :
									<Text ml={10} fontSize={'lg'} fontWeight={'600'} sx={{ display: 'block' }}>
										${purchase.price}
									</Text>
								</CardBody>
							</Card>
						</GridItem>
					))}
				</SimpleGrid>
			</Box>
		</HomeWrapper>
	)
}

export default Purchases