const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
<template>
    <div class="auth-container">
        <h2>Login</h2>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <div class="auth-group">        
            <label for="email">Email: </label>
            <input type="email" id="email" placeholder="email" v-model="email"/>
        </div>

        <div class="auth-group">        
            <label for="password">Password: </label>
            <input type="password" id="password" placeholder="password" v-model="password"/>
       </div>

        <button type="submit" @click="login" :disabled="loading">{{ loading ? 'loggin in...' : 'login' }}</button>

        <p>Don't have an account ? 
            <router-link to="/register">Register</router-link>
        </p>
    </div>
</template>

<script>
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default {
    name: 'LoginPage',
    data() {
        return{
            email: '', 
            password: '',
            errorMsg: '',
            loading: false
        }
    },
    methods: {
        async login() {
            if(!this.email || !this.password){
                this.errorMsg = 'Please fill in all fields';
                return;
            }
            this.errorMsg = '';
            this.loading = true;

            try{
                const response = await fetch(`${BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email: this.email, password: this.password })
                });

                const data = await response.json();

                if(response.ok){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_name', data.user_name);
                    this.$router.push('/tasks');
                }else{
                    this.errorMsg = data.error || 'Login failed';
                }
            }catch(error){
                this.errorMsg = "could not log you in";
            }finally{
                this.loading = false;
            }
            
        }
    }
}
</script>

<style scoped>
.auth-container{
    max-width: 400px;
    margin: 80px auto;
    padding: 30px;
    background: #f3f4f6;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.auth-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
input { padding: 10px; border-radius: 8px; border: 2px solid #d1d5db;}
input:focus { border-color: #2563eb; }
button {
    padding: 10px;
    color: white;
    background: #2563eb;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
button:hover:not(:disabled) { background: #1d4ed8; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error-msg {
    background: #fee2e2;
    color: #dc2626;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
}
a { color: #2563eb; font-weight: bold; } 
</style>
