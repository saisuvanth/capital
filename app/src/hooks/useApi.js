import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setUser, userLogin, userLogout } from "../store/authReducer";

const useApi = () => {
	const { user, token } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const api = axios.create({
		baseURL: 'http://localhost:8080'
	});

	const login = async (data) => {
		const res = await api.post('/login', data);
		dispatch(userLogin({}, res.data.token))
		localStorage.setItem('token', res.data.token);
		return res.data;
	}

	const getItems = async () => {
		const res = await api.get('/get-items', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return res.data;
	}

	const getUser = async () => {
		const res = await api.get('/get-user', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		console.log(res.data);
		dispatch(setUser(res.data));
		return true;
	}

	const addItems = async (item) => {
		const res = await api.post('/add-item', item, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		dispatch(addItem(item))
	}

	const purchaseItem = async (item) => {
		const res = await api.post('/purchase', item, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		dispatch(removeItem(item.id))
		return res.data;
	}

	const register = async (data) => {
		const res = await api.post('/register', data);
		return res.data;
	}

	const logout = async () => {
		dispatch(userLogout());
		localStorage.removeItem('token');
	}

	return { login, register, getItems, addItems, getUser, logout, purchaseItem }
}

export default useApi