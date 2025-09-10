$(document).ready(function () {
    function loadTodos() {
        let cookies = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (!cookies) return;
        let todos = decodeURIComponent(cookies.split('=')[1]).split('|');
        todos.forEach(todo => addTodo(todo, false));
    }

    function saveTodos() {
        let todos = [];
        $('#ft_list div').each(function () {
            todos.push($(this).text());
        });
        document.cookie = `todos=${encodeURIComponent(todos.join('|'))}; path=/; max-age=${60*60*24*7}`;
    }

    function addTodo(text, save = true) {
        let todoDiv = $('<div></div>').text(text);
        todoDiv.on('click', function () {
            if (confirm(`Do you want to remove this TO DO?\n"${text}"`)) {
                $(this).remove();
                saveTodos();
            }
        });
        $('#ft_list').prepend(todoDiv);
        if (save) saveTodos();
    }

    $('#newBtn').on('click', function () {
        let text = prompt('Enter new TO DO:');
        if (text && text.trim() !== '') {
            addTodo(text.trim());
        }
    });

    loadTodos();
});
