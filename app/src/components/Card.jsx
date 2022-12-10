import React, { Fragment } from 'react'
import { Card as BaseCard, CardFooter, CardHeader, Image, Text, Stack, Button, CardBody, Badge } from '@chakra-ui/react';
import useApi from '../hooks/useApi';

const Card = ({ item, my_item }) => {
	const { purchaseItem } = useApi()

	const handleClick = (id) => {
		purchaseItem({ id }).then(res => {
			console.log(res)
		})
	}

	return (
		<BaseCard w={'18rem'} border={'1px solid white'} px={'5px'} py={'8px'} sx={{ borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;' }} >
			<CardHeader display={'flex'} flexDir={'column'} alignItems={'center'} p={'5px'}>
				<Image h={'44'} src='https://apollo-singapore.akamaized.net/v1/files/i6dok3jqvv9b1-IN/image;s=780x0;q=60' sx={{ borderRadius: '8px' }} />
				<Text w={'80%'} textAlign={'start'} fontSize={'20'} fontWeight={600}>
					{item.name}
				</Text>
			</CardHeader>
			<CardBody p={'5px'} display={'flex'} flexDir={'column'} alignItems={'center'}>
				<Stack w={'80%'} direction={'row'} >
					<Text display={'block'}>
						Available at
					</Text>
					{my_item ?
						<Text ml={10} fontSize={'lg'} fontWeight={'600'} sx={{ display: 'block' }}>
							${item.price}
						</Text> : null
					}
				</Stack>
			</CardBody>
			<CardFooter p={'2px'} pr={'5'} justifyContent={my_item ? 'end' : 'space-between'}>
				{!my_item ?
					<Fragment>
						<Text ml={10} fontSize={'lg'} fontWeight={'600'} sx={{ display: 'block' }}>
							${item.price}
						</Text>
						<Button colorScheme={'green'} onClick={() => handleClick(item._id)}>
							Buy
						</Button>
					</Fragment> :
					<Badge disabled variant={'solid'} colorScheme={'green'} >
						{item.status}
					</Badge>
				}
			</CardFooter>
		</BaseCard>)
}

export default Card