const socket = io('http://localhost:3000');
socket.on('connect', function () {
  console.log('Connected');
  socket.emit('connected');

  const createTodo = document.getElementById('createTodo');
  createTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('todoId');
    const title = document.getElementById('todoTitle');
    const createdBy = socket.id;
    const completed = document.getElementById('todoComp_true').checked
      ? true
      : false;
    if (id.value && title.value) {
      socket.emit('createTodo', {
        id: id.value,
        createdBy: createdBy,
        title: title.value,
        completed: completed,
      });
    }
    id.value = '';
    title.value = '';
    completed.value = '';
  });

  document.getElementById('updateTodo').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('updateTodo', {
      id: document.getElementById('todoId').value,
      title: document.getElementById('todoTitle').value,
      completed: document.getElementById('todoComp_true').checked
        ? true
        : false,
    });
  });
});

socket.on('createTodo', function (todo) {
  const todoList = document.getElementById('todoTasks');
  let item = document.createElement('li');
  console.log(todo);
  item.innerHTML = `<h3>Task ${todo.id} = ${todo.title}</h3><h4>Completed: ${todo.completed}</h4> createdBy: ${todo.createdBy}`;
  todoList.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  socket.emit('msg', 'To-do Added');
});

socket.on('updateTodo', (todoArray) => {
  const todoList = document.getElementById('todoTasks');
  todoList.innerHTML = '';
  if (todoArray) {
    todoArray.forEach((element) => {
      let item = document.createElement('li');
      console.log(element);
      item.innerHTML = `<h3>Task ${element.id} = ${element.title}</h3><h4>Completed: ${element.completed}</h4> createdBy: ${element.createdBy}`;
      todoList.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
    socket.emit('msg', 'All To-do Added');
  }
});

socket.on('error', function (err) {
  document.getElementById('errors').innerText = err;
  alert(err);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
