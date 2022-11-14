import React, {ChangeEvent, ChangeEventHandler, FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = ({guests, submit}) => {

    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: '',
    });
    const {user} = useTypedSelector(state => state.authReducer);

    const handleAuthorChange = (guest: string) => {
        setEvent({...event, guest})
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEvent({...event, description: e.target.value})
    }
    
    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date?.toDate())});
        }
       
    }

    const submitForm = () => {
        
        submit({...event, author: user?.username});
    }

    console.log(event)
    return (
        <Form
        onFinish={submitForm}
        >
            <Form.Item
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                label="Event Name"
                name="eventName"
                rules={[rules.required('Please input event name')]}
            >
                <Input onChange={handleDescriptionChange}/>
            </Form.Item>
            <Form.Item
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                label="Choose date"
                name="datePicker"
                rules={[rules.required('Please choose date'), rules.isDateAfter('Wrong date to create event')]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                labelCol={{span: 5}}
                wrapperCol={{span: 19}}
                label='Choose guest'
                name='authors'
            >
                <Select
                    placeholder="Select a option"
                    onChange={handleAuthorChange}
                    options={guests.map((guest) => {
                        return {value: guest.username, label: guest.username}
                    })
                    }
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Row justify='end'>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Row>
            </Form.Item>

        </Form>
    );
};

export default EventForm;
