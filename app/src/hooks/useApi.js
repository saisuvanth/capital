import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, setUser, userLogin, userLogout } from "../store/authReducer";

const useApi = () => {
	const { token } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const api = axios.create({
		baseURL: 'https://capital-server.onrender.com'
	});

	const login = async (data) => {
		const res = await api.post('/login', data);
		dispatch(userLogin({ user: {}, token: res.data.token }))
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
		// eslint-disable-next-line no-unused-vars
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
		navigate('/');
	}

	return { login, register, getItems, addItems, getUser, logout, purchaseItem }
}

export default useApi