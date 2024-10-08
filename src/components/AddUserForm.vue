<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <h3>Add New User</h3>
      <form @submit.prevent="addUser">
        <div>
          <label for="name">Name:</label> 
          <br>
          <input type="text" v-model="user.Name" id="name" class="input" />
          <br>
          <span v-if="errors.Name" class="error">{{ errors.Name }}</span>
        </div>
        <br>
        <div>
            <label>Gender:</label>
            <div>
                <label>
                <input type="radio" v-model="user.Gender" value="Male" class="radio" /> Male
                </label>
                <label>
                <input type="radio" v-model="user.Gender" value="Female" class="radio" /> Female
                </label>
                <label>
                <input type="radio" v-model="user.Gender" value="Other" class="radio" /> Other
                </label>
                <br>
                <span v-if="errors.Gender" class="error">{{ errors.Gender }}</span>
            </div>
        </div>
        <br>
        <div>
          <label for="dob">Date of Birth:</label>
          <br>
          <input type="date" v-model="user.DateofBirth" id="dob" class="input" />
          <br>
          <span v-if="errors.DateofBirth" class="error">{{ errors.DateofBirth }}</span>
        </div>
        <br>
        <div>
          <label for="email">Email:</label>
          <br>
          <input type="email" v-model="user.Email" id="email" class="input" />
          <br>
          <span v-if="errors.Email" class="error">{{ errors.Email }}</span>
        </div>
        <br>
        <div class="btn-group">
          <v-btn type="submit" class="bg-success">Add</v-btn>
          <v-btn @click="closeForm" class="bg-danger">Close</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['isVisible', 'onClose', 'users']);
const emit = defineEmits(['addUser']);

const user = ref({
  Name: '',
  Gender: '',
  DateofBirth: '',
  Email: ''
});

const errors = ref({});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const addUser = () => {
  errors.value = {};
  if (!user.value.Name) {
    errors.value.Name = 'Tên không được để trống';
  }
  if (!user.value.Email) {
    errors.value.Email = 'Email không được để trống';
  } else if (!validateEmail(user.value.Email)) {
    errors.value.Email = 'Email không hợp lệ';
  } else if (props.users.some(item => item.Email === user.value.Email)) {
    errors.value.Email = 'Email đã tồn tại';
  }
  if(!user.value.Gender) {
    errors.value.Gender = 'Giới tính không được để trống'
  }
  if (!user.value.DateofBirth) {
    errors.value.DateofBirth = 'Ngày sinh không được để trống';
  } else if (new Date(user.value.DateofBirth) > new Date()) {
    errors.value.DateofBirth = 'Ngày sinh không được lớn hơn ngày hiện tại';
  }
  if (Object.keys(errors.value).length === 0) {
    const newUser = { ...user.value, id: Math.ceil(Math.random() * 100) };
    localStorage.setItem('users', JSON.stringify([...props.users, newUser]));
    emit('addUser', newUser); 
    closeForm();
  }
};

const closeForm = () => {
  user.value = { Name: '', Gender: '', DateofBirth: '', Email: '' }; 
  errors.value = {};
  emit('close'); 
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 5px;
  width: 400px; 
  height: auto; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
.input:focus {
  border-color: #4CAF50;
  outline: none;
}
.radio {
  margin-right: 5px;
}
.error {
  color: red;
  font-size: 0.9em;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
