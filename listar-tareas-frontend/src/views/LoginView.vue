<template>
  <div class="container">
    <div class="modal-text">
      <RouterLink :to="{ name: 'register' }" class="link">Register</RouterLink><br>
      <h1 title="title">Login</h1>
      <form class="form-style">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control input-box" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control input-box" id="exampleInputPassword1" placeholder="Password"
            v-model="password">
        </div>
        <button type="submit" class="btn button-form" @click.prevent="loginUser">Submit</button>
        <p class="message-error">{{ feedback }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useAuth from '@/store/auth';
import router from '@/router';

const store = useAuth();
const email = ref('');
const password = ref('');
const userId = ref('');
const feedback = ref('');

const loginUser = async () => {
  try{
    const response = await store.login(email.value, password.value)
  if (response == false) {
    feedback.value = 'Login error'
  } else {
    userId.value = await store.getUserId();
    router.push({ name: 'tasks', params: { id: userId.value } })
  }
  } catch (err) {
    feedback.value = 'Ingrese todos los datos requeridos' || 'Login failed';
  }
}
</script>

<style scoped lang="scss">
.container {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: $textColor;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 3px solid $borderImage;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  min-width: 40%;
  min-height: 30%;
  max-width: 50%;
  max-height: 80%;
  background: $backGroundModal;
  text-align: center;
  cursor: default;
}

.title {
  padding: 20px;
}

.form-style {
  flex-direction: column;
  padding: 10px;
}

.input-box {
  background-color: $colorBox;
  border-radius: 8px;
  border: 2px solid $borderImage;
}

.button-form {
  margin-top: 20px;
  width: 50%;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: $colorButton;
  color: $textColor;
  border-radius: 8px;
  border: 2px solid $borderImage;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.link {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: transparent;
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}
.link:hover {
  text-decoration:underline;
}
.message-error {
  padding-top: 10px;
}
</style>