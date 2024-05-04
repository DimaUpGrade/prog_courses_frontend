function tokenIsSet () {
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

export { 
    tokenIsSet, 
    formatDate
}