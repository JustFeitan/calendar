import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useAppDispatch, useTypedSelector} from "../hooks/useTypedSelector";
import {createEvent, fetchEvents, fetchGuests} from "../store/reducers/event/ActionCreators";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(fetchGuests());
        dispatch(fetchEvents(user.username));
    }, [])

    const showModal = () => {
        setModalVisible(true);
    }



    const addEvent = (event: IEvent) => {
        setModalVisible(false);
        dispatch(createEvent(event));
    }

    return (
        <Layout>

            <EventCalendar events={events}/>
            <Row justify='center'>
                <Button onClick={showModal}>Add event</Button>
            </Row>
            <Modal
                title='Add event'
                open={modalVisible}
                centered
                footer={null}
            >
                <EventForm guests={guests} submit={addEvent}/>
            </Modal>
        </Layout>
    );
};

export default Event;
