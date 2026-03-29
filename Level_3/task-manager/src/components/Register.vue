const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
<template>
    <div class="auth-container">
        <h2>Register</h2>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>

        <div class="auth-group">
            <label for="username">User Name: </label>
            <input type="text" id="username" placeholder="user name" v-model="username"/>
        </div>

        <div class="auth-group">
            <label for="email">Email: </label>
            <input type="email" id="email" placeholder="email" v-model="email"/>
        </div>
        
        <div class="auth-group">
            <label for="password">Password: </label>
            <input type="password" id="password" placeholder="password" v-model="password"/>
        </div>

        <div class="auth-group">
            <label for="confirm-password">Confirm Password: </label>
            <input type="password" id="confirm-password" placeholder="confirm password" v-model="confirmPassword"/>
        </div>
       
        <button type="submit" @click="register" :disabled="loading">{{ loading ? 'registering' : 'Register' }}</button>
        
        <p>Already have an account ? 
            <router-link to="/">Login</router-link>
        </p>
    </div>
</template>

<script>

export default{
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMsg: '',
            successMsg: '',
            loading: false
        }
    },
    methods: {
        async register(){
            this.errorMsg = '';
            this.successMsg = '';

            // validation
            if(!this.username || !this.email || !this.password || !this.confirmPassword){
                this.errorMsg = 'Please fill in all fields';
                return;
            }
            if(this.password !== this.confirmPassword){
                this.errorMsg = 'Passwords do not match';
                return;
            }
            if(this.password.length < 6){
                this.errorMsg = 'Password must be at least 6 characters';
                return;
            }

            this.loading = true;
            try{
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_name: this.username, email: this.email, password: this.password})
                });

                const data = await response.json();

                if(response.ok){
                    this.successMsg = 'Account created? Redirecting to Login...';
                    setTimeout(() => this.$router.push('/'), 1500);
                }else{
                    this.errorMsg = data.error || 'Registration failed';
                }
            }catch(error){
                this.errorMsg = 'Could not connect to Server';
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
input:focus { border-color: #2563eb;}
button {
    padding: 10px;
    color: white;
    background: #2563eb;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
button:hover:not(:disabled) { background: #1d43d8; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.error-msg{
    background: #fee2e2;
    color: #dc2626;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
}
.success-msg{
    background: #dcfce7;
    color: #16a34a;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
}
a { color: #2563eb; font-weight: bold; }
</style>