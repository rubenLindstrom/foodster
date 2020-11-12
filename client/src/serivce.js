import axios from "axios";
import recipes from "./model/recipes.json";

axios.interceptors.request.use(
	(req) => {
		console.log(req);
		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	(res) => {
		console.log(res);
		return res;
	},
	(error) => {
		console.dir(error);
		return Promise.reject(error);
	}
);

class ApiService {
	// getRecipes({ discarded = [], blacklist = [], whitelist = [] }) {
	//   return axios
	//     .post("http://localhost:8001", { discarded, whitelist, blacklist })
	//     .then((res) => res.data);
	// }
	async getRecipes({ discarded = [], blacklist = [], whitelist = [] }) {
		return recipes
			.filter(
				({ id, ingredients }) =>
					(!discarded || !discarded.includes(id)) &&
					(!blacklist ||
						!blacklist.length ||
						!ingredients.some((i) => blacklist.includes(i))) &&
					(!whitelist ||
						!whitelist.length ||
						ingredients.some((i) => whitelist.includes(i)))
			)
			.slice(0, 10);
	}
}

export default new ApiService();
