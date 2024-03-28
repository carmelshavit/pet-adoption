const addFronBack = (text, prefix = "--") => {
  return `${prefix}${text.toLowerCase()}${prefix}`;
};

const fetchTodo = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json = await resp.json();

  return [json];
};
module.exports = {
  addFronBack,
  fetchTodo,
};
