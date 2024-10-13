type WithTimestamps<T extends object> = T & {
	createdAt: string;
	updatedAt: string;
}

export type WithUser<T extends object> = T & {
	User: User
}

export type Post = WithTimestamps<{
	id: number;
	url: string,
	title: string;
	content: string;
	UserId: number;
}>

export interface User {
	id: number;
	login: string;
}

export type Login = { 
	token: string,
	user: WithTimestamps<User>
}

export type AuthError = { 
	auth: false 
}

export type AuthSuccess =  { 
	auth: true, 
	user: User 
}

export type Auth = AuthError | AuthSuccess;

export type Error422 = [
	string,
	string,
	Array<string | number>
]

export type Comment = {
	id: number, 
	title: string
}