const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

function loadTodos() {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (!cookies) return;
    const todos = decodeURIComponent(cookies.split('=')[1]).split('|');
    todos.forEach(todo => addTodo(todo, false));
}

function saveTodos() {
    const todos = Array.from(ft_list.children).map(div => div.textContent);
    document.cookie = `todos=${encodeURIComponent(todos.join('|'))}; path=/; max-age=${60*60*24*7}`; // 1 week
}

function addTodo(text, save = true) {
    const todoDiv = document.createElement('div');
    todoDiv.textContent = text;
    todoDiv.addEventListener('click', () => {
        if (confirm(`Do you want to remove this TO DO?\n"${text}"`)) {
            ft_list.removeChild(todoDiv);
            saveTodos();
        }
    });
    ft_list.insertBefore(todoDiv, ft_list.firstChild);
    if (save) saveTodos();
}

newBtn.addEventListener('click', () => {
    const text = prompt('Enter new TO DO:');
    if (text && text.trim() !== '') {
        addTodo(text.trim());
    }
});

window.onload = loadTodos;
