import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
	useUpdateUserMutation,
	useGetUserDetailsQuery,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
	//Get the user id from the URL
	const { id: userId } = useParams();

	//Create the states for the form fields
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	//Get the data for the current product
	const {
		data: user,
		isLoading,
		error,
		refetch,
	} = useGetUserDetailsQuery(userId);

	//Initialize the updateUser mutation
	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	//Initialize the navigate function
	const navigate = useNavigate();

	//Fill the form fields with the product data
	//If there's a product set all the state fields with the user data
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, name, email, isAdmin });
			toast.success('User updated successfully.');
			refetch();
			navigate('/admin/userlist');
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Back to users
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}

				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name' className='my-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='email' className='my-3'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='siAdmin' className='my-2'>
							<Form.Check
								type='checkbox'
								label='is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<Button type='submit' variant='primary' className='my-3'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};
export default UserEditScreen;
