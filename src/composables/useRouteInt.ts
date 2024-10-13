import { useRoute } from "vue-router";

export default function useRouteInt(name: string, pattern = /^[1-9]+\d*$/){
	/*
		{ valid: true, value: number }
		{ valid: false, value: NaN }
	*/
	const { params } = useRoute();
	const values = params[name];
	const value = Array.isArray(values) ? values[0] : values;

	return pattern.test(value) ? 
		{ valid: true, value: parseInt(value) } :
		{ valid: false, value: NaN };
}