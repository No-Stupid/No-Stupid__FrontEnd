import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '../../css/Calendar.css';
import Modal from 'react-modal';
import CorporateInfo from "../corporateInfo/CorporateInfo";

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [selectDates, setSelectDates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [enteredText, setEnteredText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editEventId, setEditEventId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('id');
            const response = await axios.get('http://localhost:8080/api/applyList');
            const filteredEvents = response.data.filter(item => item.member == userId);

            setEvents(filteredEvents.flatMap(event => {
                const originalEvent = {
                    id: event.id,
                    start: new Date(event.startDate),
                    end: new Date(event.endDate),
                    title: event.companyName,
                    allDay: true,
                };

                const events = [];

                if (event.documentDate) {
                    const documentEvent = {
                        id: event.id + '_document',
                        start: new Date(event.documentDate),
                        end: new Date(event.documentDate),
                        title: event.companyName + ' 서류',
                        allDay: true,
                    };
                    events.push(documentEvent);
                }

                if (event.interviewDate) {
                    const interviewEvent = {
                        id: event.id + '_interview',
                        start: new Date(event.interviewDate),
                        end: new Date(event.interviewDate),
                        title: event.companyName + ' 면접',
                        allDay: true,
                    };
                    events.push(interviewEvent);
                }

                if (event.passDate) {
                    const passEvent = {
                        id: event.id + '_pass',
                        start: new Date(event.passDate),
                        end: new Date(event.passDate),
                        title: event.companyName + ' 합격',
                        allDay: true,
                    };
                    events.push(passEvent);
                }

                return events.length > 0 ? [originalEvent, ...events] : [originalEvent];
            }));
        } catch (error) {
            console.error(error);
        }
    };      

    const handleSelect = ({ start, end, id }) => {
        const startDate = moment(start).format('YYYY-MM-DD');
        const endDate = moment(end).subtract(1, 'days').format('YYYY-MM-DD');
        setSelectDates([startDate, endDate])
        setIsEditing(false);
        setEditEventId(null);
        setIsModalOpen(true);

    };

    const handleEdit = (event) => {
        setSelectedDate(moment(event.start).format('YYYY.MM.DD'));
        setEnteredText(event.title);
        setIsEditing(true);
        setEditEventId(event.id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            if (editEventId) {
                await axios.delete(`/api/applyInfo/delete/${editEventId}`);
                fetchData(); // Refresh events after deleting
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        console.log('Modal closed');
        setIsModalOpen(false);
    };

    const handleTextSubmit = async (text) => {
        try {
            const formattedDate = moment(selectedDate, 'YYYY.MM.DD').toISOString();

            if (isEditing) {
                await axios.put(`http://localhost:8080/api/calendar/edit/${editEventId}`, {
                    date: formattedDate,
                    text,
                    userId: localStorage.getItem('id')
                });
            } else {
                await axios.post('http://localhost:8080/api/calendar', {
                    date: formattedDate,
                    text,
                    userId: localStorage.getItem('id')
                });
            }

            fetchData();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const eventPropGetter = (event) => {
        const backgroundColor =
            events.filter(
                (e) =>
                    isNumericId(e.id) && moment(e.start).isSameOrBefore(moment(event.end)) &&
                    moment(e.end).isSameOrAfter(moment(event.start))
            ).length > 1
                ? 'red'
                : 'green';

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '0',
                display: 'block',
            },
        };
    };

    const isNumericId = idValue => {
        return /^\d+$/.test(idValue);
    }

    const dayPropGetter = date => {
        console.log(events)
        const eventsForDay = events.filter(
            event =>
                isNumericId(event.id) && moment(date).startOf('day').isSameOrBefore(moment(event.end)) &&
                moment(date).endOf('day').isSameOrAfter(moment(event.start))
        );
        const hasOverlap = eventsForDay.length > 1;

        return {
            className: hasOverlap ? 'overlapping-cell' : 'non-overlapping-cell',
        };
    };



    return (
        <div className='page_'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelect}
                onSelectEvent={handleEdit}
                dayPropGetter={dayPropGetter}
                selectable
                style={{ height: 600, zIndex: 0 }}
                eventPropGetter={(event, start, end, isSelected) => eventPropGetter(event, start, end, isSelected)}
            />

            <Modal
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        backgroundColor: 'white',
                        zIndex: 1001,
                    },
                }}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Text Input Modal"
            >
                <CorporateInfo modal={true} id={editEventId}
                            closeModal={closeModal}
                            handleDelete={handleDelete}
                            fetchData={fetchData}
                            isEditing={isEditing}
                            selectDates={selectDates}
                ></CorporateInfo>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
