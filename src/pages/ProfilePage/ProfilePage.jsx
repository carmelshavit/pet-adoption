import React from 'react'
import {
    FormGroup,
    FormField,
    Form,
    Input,
    TextArea,
    Button,

    Container,
    Segment
} from 'semantic-ui-react'

export default function ProfilePage() {
    return (
        <Container>
            <div>
                <Form>
                    <Segment>
                        <FormGroup widths='equal' style={{ marginTop: 20 }}>
                            <FormField
                                id='form-input-control-first-name'
                                control={Input}
                                label='First name'
                                placeholder='First name'
                            />
                            <FormField
                                id='form-input-control-last-name'
                                control={Input}
                                label='Last name'
                                placeholder='Last name'
                            />

                        </FormGroup>
                    </Segment>
                    <Segment>
                        <FormGroup widths='equal' style={{ marginTop: 20 }}>
                            <FormField
                                id='form-input-control-phone-number'
                                control={Input}
                                label='phone-number'
                                placeholder='Phone-Number'
                            />

                            <FormField
                                id='form-input-control-error-email'
                                control={Input}
                                label='Email'
                                placeholder='joe@schmoe.com'
                                error={{
                                    content: 'Please enter a valid email address',
                                    // pointing: 'below',
                                }}
                            />
                        </FormGroup>
                    </Segment>

                    <FormField
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Opinion'
                        placeholder='Opinion'
                    />
                    <FormField
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'

                    />
                </Form>

            </div>
        </Container>
    )
}
