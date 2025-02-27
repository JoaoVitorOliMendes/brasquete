import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { Event as GroupEvent } from '@/model/api/event'

interface EventContextProps {
    eventState?: GroupEvent | null,
    getEvent?: (eventid: number) => Promise<any>,
    error: string | null,
    isLoading?: boolean
}

export const EventContext = createContext<EventContextProps | undefined>(undefined)

export const useEvent = (): EventContextProps => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error('useEvent must be used within a DataProvider');
    }
    return context;
}

export const EventProvider = ({ children }: PropsWithChildren) => {
    const [eventState, setEventState] = useState<GroupEvent | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const getEvent = async (eventid: number) => {
        setIsLoading(true)
        try {
            // return await axios.post(`${API_URL}`, { data })
            const event: GroupEvent = {
                id: 1,
                date: new Date(),
                group: {
                    id: 1,
                    name: 'Grupo 1',
                    admin: {
                        id: 1,
                        name: 'João'
                    },
                    location: {
                        city: 'Belo Horizonte',
                        country: 'BR',
                        latitude: -19.93634456787944,
                        longitude: -43.96623943001032,
                        neighborhood: 'Grajaú',
                        state: 'Minas Gerais',
                        street: 'Rua Santa Cruz',
                        streetNumber: '560'
                    },
                    groupMembers: [
                        {
                            id: 0,
                            confirmed: 'confirmed',
                            position: 'Ala',
                            userId: 0,
                            user: {
                                id: 0,
                                name: 'João'
                            }
                        },
                        {
                            id: 1,
                            confirmed: 'confirmed',
                            position: 'Pivo',
                            userId: 0,
                            user: {
                                id: 1,
                                name: 'Jamir'
                            }
                        },
                        {
                            id: 2,
                            confirmed: 'confirmed',
                            position: 'Armador',
                            userId: 0,
                            user: {
                                id: 2,
                                name: 'Diego'
                            }
                        },
                        {
                            id: 3,
                            confirmed: 'confirmed',
                            position: 'Ala',
                            userId: 0,
                            user: {
                                id: 3,
                                name: 'Alberto'
                            }
                        }
                    ],
                }
            }
            setEventState(event)
            return Promise.resolve(event)
        } catch (e) {
            if (e instanceof Error)
                setError(e.message)
            else
                setError('Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    const value: EventContextProps = {
        getEvent,
        eventState,
        error,
        isLoading
    }
    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}