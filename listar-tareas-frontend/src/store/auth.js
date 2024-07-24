import { defineStore } from "pinia";

const useAuth = defineStore('auth', {
    state: () => {
        return {
            token: localStorage.getItem('token') || null,
            user: localStorage.getItem('user') || null,
            baseURL: 'http://127.0.0.1:8000/api/auth'
        }
    },
    actions: {
        async getUserId() {
            return this.user
        },
        async register(name, email, password) {
            try {
                const uri = `${this.baseURL}/register`
                const rawResponse = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json'
                    },
                    body: JSON.stringify({
                        'name': name,
                        'email': email,
                        'password': password
                    })
                })

                const response = await rawResponse.json()
                this.user = response.user.id

                if (response.status == false) {
                    return false;
                } else {
                    this.token = response.token
                    localStorage.setItem('token', response.token)
                    return true;
                }
            } catch (error) {
                console.error('Register error: ', error.message);
                throw error;
            }
        },
        async login(email, password) {
            try {
                const uri = `${this.baseURL}/login`
                const rawResponse = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Accept': 'Application/json'
                    },
                    body: JSON.stringify({
                        'email': email,
                        'password': password
                    })
                })

                const response = await rawResponse.json()
                this.user = await response.id

                if (response.status == false) {
                    this.token = null
                    return false;
                } else {
                    this.token = response.token
                    localStorage.setItem('user', this.user)
                    localStorage.setItem('token', response.token)
                    return true;
                }
            } catch (error) {
                console.error('Login error: ', error.message);
                throw error;
            }
        },
        async getTasks(id, name, status) {
            const queryParams = new URLSearchParams({
                name: name,
                status: status
            })
            const uri = `${this.baseURL}/tasks/${id}?${queryParams}`
            const rawResponse = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            const response = await rawResponse.json()
            return response
        },
        async fetchUsers() {
            const uri = `${this.baseURL}/users`
            const rawResponse = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const response = await rawResponse.json()
            return response
        },
        async createTask(Nombre, Responsable) {
            const uri = `${this.baseURL}/task`
            const rawResponse = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    'name': Nombre,
                    'responsible': Responsable
                })
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        async updateTask(TaskId, Nombre, Responsable, status) {
            const uri = `${this.baseURL}/task/${TaskId}`
            const rawResponse = await fetch(uri, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    "id": TaskId,
                    'user_id': this.user,
                    'name': Nombre,
                    'responsible': Responsable,
                    'status': status
                })
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        async deleteTask(TaskId) {
            const uri = `${this.baseURL}/task/${TaskId}`
            const rawResponse = await fetch(uri, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            const response = await rawResponse.json()
            if (response.status == false) {
                return false
            } else {
                return true
            }
        },
        logout() {
            this.token = null
            localStorage.removeItem('token')
        }
    }
})

export default useAuth