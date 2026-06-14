function tokenIsSet() {
  return (localStorage.getItem("token") != null)
}

function formatDate(dateString) {
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', options);
}

function isValueURL(value) {
  const url_expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const url_regex = new RegExp(url_expression);
  return value.match(url_regex)
}

export {
  tokenIsSet,
  formatDate,
  isValueURL
}