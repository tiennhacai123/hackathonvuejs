<template>
  <div>
    <h3>Manager User</h3>
    <div>
      <v-btn class="addUser" @click="showAddForm = !showAddForm">Add New User</v-btn>
    </div>
    <input
      type="text"
      v-model="searchUser"
      placeholder="Tìm kiếm theo tên hoặc email"
      class="input-search"
    />
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filterUser" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.Name }}</td>
            <td>{{ user.Gender }}</td>
            <td>{{ user.DateofBirth }}</td>
            <td>{{ user.Email }}</td>
            <td class="btn">
              <v-btn class="bg-warning" @click="handleEdit(user)">Edit</v-btn>
              <v-btn class="bg-error" @click="handleDelete(user.id)">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddUserForm
      :isVisible="showAddForm"
      :users="users"
      @addUser="addNewUser"
      @close="showAddForm = false"
    />
    <EditUserForm
      v-if="showEditForm"
      :isVisible="showEditForm"
      :user="editedUser"
      :users="users"
      @updateUser="updateUser"
      @close="showEditForm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AddUserForm from '../components/AddUserForm.vue';
import EditUserForm from '../components/EditUserForm.vue'; 

const users = ref(JSON.parse(localStorage.getItem('users')) || [
  { id: 1, Name: 'John Doe', Gender: 'Male', DateofBirth: '1990-01-15', Email: 'john.doe@example.com' },
  { id: 2, Name: 'Jane Smith', Gender: 'Female', DateofBirth: '1985-02-25', Email: 'jane.smith@example.com' },
  { id: 3, Name: 'Michael Johnson', Gender: 'Male', DateofBirth: '1992-03-10', Email: 'michael.johnson@example.com' },
  { id: 4, Name: 'Emily Davis', Gender: 'Female', DateofBirth: '1995-04-05', Email: 'emily.davis@example.com' },
  { id: 5, Name: 'Chris Brown', Gender: 'Male', DateofBirth: '1988-05-20', Email: 'chris.brown@example.com' },
  { id: 6, Name: 'Sophia Wilson', Gender: 'Female', DateofBirth: '1997-06-18', Email: 'sophia.wilson@example.com' },
  { id: 7, Name: 'David Lee', Gender: 'Male', DateofBirth: '1991-07-30', Email: 'david.lee@example.com' },
  { id: 8, Name: 'Linda White', Gender: 'Female', DateofBirth: '1993-08-12', Email: 'linda.white@example.com' },
  { id: 9, Name: 'James Harris', Gender: 'Male', DateofBirth: '1989-09-22', Email: 'james.harris@example.com' },
  { id: 10, Name: 'Olivia Martin', Gender: 'Female', DateofBirth: '1994-10-07', Email: 'olivia.martin@example.com' }
]);

// localStorage.setItem("users", JSON.stringify(users.value));

const showAddForm = ref(false);
const showEditForm = ref(false);
const editedUser = ref('');
const searchUser = ref('');

const handleEdit = (user) => {
  editedUser.value = { ...user }; 
  showEditForm.value = true; 
};

const updateUser = (updatedUser) => {
  const index = users.value.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users.value[index] = updatedUser; 
    localStorage.setItem('users', JSON.stringify(users.value)); 
    showEditForm.value = false; 
  }
};

const handleDelete = (id) => {
  const confirmDelete = confirm("Bạn có muốn xóa người này không?");
  if (confirmDelete) {
    users.value = users.value.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(users.value));
  }
};

const addNewUser = (newUser) => {
  users.value.push(newUser);
  localStorage.setItem('users', JSON.stringify(users.value)); 
};

const filterUser = computed(() => {
  if (!searchUser.value) {
    return users.value;
  }

  const search = searchUser.value.toLowerCase();
  return users.value.filter(user => 
    user.Name.toLowerCase().includes(search) ||
    user.Email.toLowerCase().includes(search)
  );
});
</script>

<style>
.addUser {
  margin-left: 1200px;
  background-color: rgb(68, 68, 225);
  color: white;
}
.table-container {
  margin: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #4CAF50;
  color: white;
}
tbody tr {
  transition: background-color 0.3s;
}
tbody tr:hover {
  background-color: #f1f1f1;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.btn {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.input-search {
  width: 300px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 1000px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
