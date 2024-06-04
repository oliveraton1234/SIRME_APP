
import { setUser, clearUser } from '../reducers/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const restoreSession = () => async (dispatch) => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser !== null) {
      dispatch(setUser(JSON.parse(storedUser)));
    } else {
      dispatch(clearUser());
    }
  } catch (error) {
    console.error('Failed to restore user session:', error);
  }
};

