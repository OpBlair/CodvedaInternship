<template>
    <div class="auth-container">
        <h2>Register</h2>

        <div class="auth-group">
            <label for="username">User Name: </label>
            <input type="text" id="username" placeholder="user name"/>
        </div>

        <div class="auth-group">
            <label for="email">Email: </label>
            <input type="email" id="email" placeholder="email"/>
        </div>
        
        <div class="auth-group">
            <label for="password">Password: </label>
            <input type="password" id="password" placeholder="password"/>
        </div>

        <div class="auth-group">
            <label for="confirm-password">Confirm Password: </label>
            <input type="password" id="confirm-password" placeholder="confirm password"/>
        </div>
       
        <button type="submit">Register</button>
        
        <p>Already have an account ? 
            <router-link to="/">Login</router-link>
        </p>
    </div>
</template>

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
button {
    padding: 10px;
    color: white;
    background: #2563eb;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>