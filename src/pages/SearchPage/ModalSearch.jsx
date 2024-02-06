
import React from 'react'
import {
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Header,
    Image,
    Modal,
} from 'semantic-ui-react'

export default function ModalSearch({ isModalOpen, setIsModalOpen, selectedImage, src }) {
    return (
        <div>
            {isModalOpen &&
                <Modal
                    closeIcon
                    open={open}
                    onClose={() => setIsModalOpen(false)}
                    onOpen={() => setIsModalOpen(true)}

                >
                    <ModalContent image>
                        <Image size='medium' src={src[selectedImage]} wrapped />
                        <ModalDescription>
                            <Header>Default Profile Image</Header>
                            <p>
                                Where would you like to search?
                            </p>
                            <p>Is it okay to use this photo?</p>
                        </ModalDescription>
                    </ModalContent>
                    <ModalActions>
                        <Button color='black' onClick={() => setOpen(false)}>
                            Nope
                        </Button>
                        <Button
                            content="Yep, that's me"
                            labelPosition='right'
                            icon='checkmark'
                            // onClick={() => setOpen(false)}
                            positive
                        />
                    </ModalActions>
                </Modal>
            }
        </div>
    )

}


