import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { clearUser } from "../logic/Redux/reducers/AuthReducer";


function Algo() {
    const dispatch = useDispatch();
    AsyncStorage.clear()
    dispatch(clearUser());
  return (
    <View>

    </View>
  );
}

export default Algo;