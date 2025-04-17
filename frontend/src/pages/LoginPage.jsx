import { Box, VStack, Text, Field, Fieldset, Input, Button, Link } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function LoginPage() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			// Handle login
			if (!formData.username || !formData.password) {
				alert('Please fill in all fields');
				return;
			}

			localStorage.setItem('username', formData.username);

			navigate('/')
		} else {
			// Handle signup
			if (formData.password !== formData.confirmPassword) {
				alert('Passwords do not match');
				return;
			}
			// clear the formData object
			setFormData({
				username: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
			setIsLogin(true);
		}
	}

  return (
    <Box bgColor={'rgb(3, 83, 164)'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {/* Make me a login page */}
        <VStack spacing={6} bgColor={'white'} padding={'14'} rounded={'md'}>
          <Text
            fontSize={'xs'}
            wordSpacing={'0.5em'}
            fontWeight={'bolder'}
            letterSpacing={'0.3em'}
            color={'rgb(3, 83, 164)'}
          >
            ImplantIQ Software
          </Text>
						
					<Text
						color={'yellow.400'}
						fontWeight={'extrabold'}
						fontSize={'3xl'}
					>
						{isLogin ? 'Login To Your Account' : 'Create An Account'}
					</Text>

					<VStack
						as={'form'}
						color={'rgb(3, 83, 164)'}
						mt={'4'}
						onSubmit={handleSubmit}
					>
						<Fieldset.Root width={'400px'}>
							<Fieldset.Content>
								<Field.Root>
									<Field.Label>Username</Field.Label>
									<Input 
										color={'black'}
										name="username" 
										placeholder='username' 
										value={formData.username}
										onChange={handleChange}
									/>
								</Field.Root>

								<Field.Root>
									<Field.Label>Email</Field.Label>
									<Input
										color={'black'}
										name="email" 
										placeholder='email' 
										value={formData.email}
										onChange={handleChange}
									/>
								</Field.Root>

								<Field.Root>
									<Field.Label>Password</Field.Label>
									<Input 
										name="password" 
										type="password" 
										placeholder='password' 
										value={formData.password}
										onChange={handleChange}
										color={'black'}
									/>
								</Field.Root>

								{!isLogin && (
									<Field.Root>
										<Field.Label>Confirm Password</Field.Label>
										<Input 
											name="confirmPassword" 
											type="password" 
											placeholder='confirm password' 
											value={formData.confirmPassword}
											onChange={handleChange}
											color={'black'}	
										/>
									</Field.Root>
								)}

							</Fieldset.Content>
							{!isLogin &&
								<Text
									color={'rgb(3, 83, 164)'}
									fontSize={'xs'}
									mt={'4'}
									mb={'2'}
									_hover={{cursor: 'pointer', textDecoration: 'underline'}}
									onClick={() => setIsLogin(!isLogin)}
								>
									Already Have An Account?
								</Text>
							}	
							<Button type='submit' width={'100%'} variant={'subtle'} bgColor={'rgb(3, 83, 164)'} _hover={{bgColor: 'rgb(3, 83, 164)',opacity: '0.8'}}>
								{!isLogin ? 'Create Account' : 'Login'}
							</Button>
						</Fieldset.Root>
					</VStack>

        </VStack>
    </Box>
  )
}

export default LoginPage
