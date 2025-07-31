import { format, parseISO } from 'date-fns';
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const formatDateFn = (dateTimeStr: string, formatType: string = 'EEE, MMM d · hh:mm a') => {
    return format(parseISO(dateTimeStr), formatType);
}

export const addLikedEvent = async (userId: string, eventId: string, eventData: any) => {
  try {
    await setDoc(doc(db, `users/${userId}/likedEvents`, eventId), eventData);
    console.log('Event added to liked events');
  } catch (err) {
    console.error('Error saving liked event:', err);
  }
};