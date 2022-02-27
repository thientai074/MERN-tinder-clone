import './UpdateCardModal.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect} from 'react';
import { CardContext} from '../../context/cardContext/CardContext';

const UpdateCardModal = () => {

	const { cardState: {card}, 
			showUpdateCardModal, 
			setShowUpdateCardModal,
			updateCard} = useContext(CardContext)

	const [updatedCard, setUpdatedCard ] = useState(card
		
	)

	useEffect(()=> setUpdatedCard(card),[card])
	
	const {name, imgUrl } = updatedCard

	const onChangeUpdatedCardForm = (e) => {
		setUpdatedCard({...updatedCard, [e.target.name]: e.target.value})
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		await updateCard(updatedCard)
		setShowUpdateCardModal(false)

	}

	const closeDialog = () => {
		setUpdatedCard(card)
		setShowUpdateCardModal(false)
	}

    return (
		
			<Modal className='updateModal' show={showUpdateCardModal}>
			<Modal.Header className='modalHeader' >
				<Modal.Title style={{padding: '6px'}}>Chỉnh sửa ảnh bên tay phải</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text>Tên ảnh sau chỉnh sửa</Form.Text><br/>
						<Form.Control
							className='updateInput'
							type='text'
							placeholder='Tên ảnh'
							name='name'							
							required
							aria-describedby='title-help'	
							value={name}
							onChange={onChangeUpdatedCardForm}						
						/><br/>
					<Form.Text>Link ảnh sau chỉnh sửa</Form.Text>
					</Form.Group>
					<Form.Group className='my-4'>
						<Form.Control
							className='updateInput'
							type='text'
							placeholder='Only Image address link on internet works'
							name='imgUrl'
							value={imgUrl}
							onChange={onChangeUpdatedCardForm}						
						/>
					</Form.Group>					
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' className='cancelButton' onClick={closeDialog}>
						Thoát
					</Button>
					<Button variant='primary' className='updateButton' type='submit'>
						Sửa
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
    )}

export default UpdateCardModal