import { useState } from 'react';
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { MenuMenu, MenuItem, Menu, Button, ButtonGroup, ButtonOr } from 'semantic-ui-react'
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

export default function MainHeader() {

    const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false)
    const [activeItem, setActiveItem] = useState('home')

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    const navigate = useNavigate()
    return (
        <div>
            <Menu pointing secondary size='large'>
                <MenuItem as={Link} to='/'
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
                <MenuItem as={Link} to='/search'
                    name='search'
                    active={activeItem === 'search'}
                    onClick={handleItemClick}
                />
                <MenuMenu position='right'>
                    <MenuItem>
                        <ButtonGroup>
                            <Button onClick={() => setIsOpenLoginModal(true)} >Login</Button>
                            {isOpenLoginModal && <LoginModal isOpenLoginModal={isOpenLoginModal} setIsOpenLoginModal={setIsOpenLoginModal} />}
                            <ButtonOr />
                            <Button positive onClick={() => setIsOpenSignupModal(true)}>Signup</Button>
                            {isOpenSignupModal && <SignupModal isOpenSignupModal={isOpenSignupModal} setIsOpenSignupModal={setIsOpenSignupModal} />}

                        </ButtonGroup>
                    </MenuItem>

                </MenuMenu>
            </Menu>
        </div>
    )
}
