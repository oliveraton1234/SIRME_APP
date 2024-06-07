import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    articulo: articleReducer
});

export default rootReducer;