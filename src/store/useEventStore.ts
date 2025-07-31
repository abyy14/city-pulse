import { create } from 'zustand';

export type Event = {
  id: string;
  name: string;
  url: string;
  images?: { url: string }[];
  dates?: { start: { localDate: string, localTime: string } };
  _embedded?: { venues: { name: string; images: { url: string }[]; city: { name: string } }[];  attractions?: { id: string; name: string; images?: { url: string }[] }[]; };
  promoter?: {
    id: string; 
    name: string;
    description?: string;
  };
  promoters?: { id: string; name: string; description?: string }[];
 
};


type EventStore = {
  events: Event[];
  filteredEvents: Event[];
  eventQuery: string;
  cityQuery: string;
 setEvents: (update: Event[] | ((prev: Event[]) => Event[])) => void;
  setFilteredEvents: (events: Event[]) => void;
  clearFilteredEvents: () => void;
  setEventQuery: (q: string) => void;
  setCityQuery: (q: string) => void;
  initialFetchDone: boolean;
  setInitialFetchDone: (done: boolean) => void;
   page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  filteredEvents: [],
  eventQuery: '',
  cityQuery: 'Dubai',
  initialFetchDone: false,
  page: 0,
  totalPages: 1,
  loading: false,
 setEvents: (update) =>
    set((state) => ({
      events: typeof update === 'function' ? update(state.events) : update,
    })),
  setFilteredEvents: (filteredEvents) => set({ filteredEvents }),
  clearFilteredEvents: () => set({ filteredEvents: [] }),
  setEventQuery: (eventQuery) => set({ eventQuery }),
  setCityQuery: (cityQuery) => set({ cityQuery }),
  setInitialFetchDone: (done) => set({ initialFetchDone: done }),
  setPage: (newPage) => set({ page: newPage }),
  setTotalPages: (total) => set({ totalPages: total }),
  setLoading: (val) => set({ loading: val }),
  resetEvents: () => set({ events: [], page: 0 }),
}));
