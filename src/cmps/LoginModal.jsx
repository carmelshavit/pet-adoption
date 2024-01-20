import {
    ModalContent,
    ModalActions,
    Button,
    Header,
    Icon,
    Modal,
    FormField,
    Form
} from 'semantic-ui-react'
import React, { useState, useContext } from 'react'
import UsersContext from '../context/UsersContext';

export default function LoginModal({ setIsOpenLoginModal }) {
    const [users, setUsers] = useContext(UsersContext);
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');

    const login = () => {
        const user = users.find((user) => user.email === email)
       
        if (user.password === password) {
            setLoggedInUser(user)
            setIsOpenLoginModal(false)
        }else{
            alert('wrong password')
        }
        // const loginUser = {
        //     id: petService.makeId(),
        //     password,
        //     email
        // }
        // petService.saveToStorage('users', users)
    }

    return (
        <div>
            <Modal
                closeIcon
                open={open}
                onClose={() => setIsOpenLoginModal(false)}
                onOpen={() => setIsOpenLoginModal(true)}
            >
                <Header />
                <ModalContent>
                    <Form>
                        <FormField>
                            <label>Email</label>
                            <input placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <label>Password</label>
                            <input placeholder='Password' value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormField>

                        {/* <Button type='submit'>Submit</Button> */}
                    </Form>

                    {/* make sure to make a condition that password equal to the second password */}
                </ModalContent>
                <ModalActions>
                    <Button color='green' onClick={login}>
                        <Icon name='checkmark' /> Login
                    </Button>
                </ModalActions>
            </Modal>
        </div>
    )
}
