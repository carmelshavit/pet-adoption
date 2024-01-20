import {
    ModalContent,
    ModalActions,
    Button,
    Header,
    Icon,
    Modal,
    FormField,
    Form,
    Input,

} from 'semantic-ui-react';
import React, { useContext, useState } from 'react';
import { petService } from '../service/service';
import LoginContext from '../context/LoginContext';
import UsersContext from '../context/UsersContext';

export default function SignupModal({ setIsOpenSignupModal }) {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [users, setUsers] = useContext(UsersContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setvalidPassword] = useState('');

    // check if i have already password i users.
    const signup = () => {
        if (password !== validPassword) return alert('passwords not identical')
        const user = {
            id: petService.makeId(),
            firstName,
            lastName,
            password,
            email,
            phoneNumber
        }
        users.push(user)
        petService.saveToStorage('users', users)
    }

    return (
        <div>
            <Modal
                closeIcon
                open={open}
                onClose={() => setIsOpenSignupModal(false)}
                onOpen={() => setIsOpenSignupModal(true)}
            >
                <Header />
                <ModalContent>
                    <Form>
                        <FormField
                            id='form-input-control-first-name'
                            control={Input}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            label='First name'
                            placeholder='First name'
                        />
                        <FormField
                            id='form-input-control-last-name'
                            control={Input}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            label='Last name'
                            placeholder='Last name'
                        />

                        <FormField
                            id='form-input-control-Phone Number'
                            control={Input}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            label='Phone Number'
                            placeholder='Phone Number'
                        />
                        <FormField
                            id='form-input-control-Password'
                            control={Input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label='Password'
                            placeholder='Password'
                        />
                        <FormField
                            id='form-input-control-Password'
                            control={Input}
                            value={validPassword}
                            onChange={(e) => setvalidPassword(e.target.value)}
                            label='Retype Password'
                            placeholder='Retype Password'
                        />
                        <FormField
                            id='form-input-control-error-email'
                            control={Input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label='Email'
                            placeholder='joe@schmoe.com'
                            error={{
                                content: 'Please enter a valid email address',
                                pointing: 'below',
                            }}
                        />

                    </Form>

                </ModalContent>
                <ModalActions>
                    <Button color='green' onClick={() => signup()}>
                        <Icon name='checkmark' /> Save
                    </Button>
                </ModalActions>
            </Modal>
        </div>
    );
}
