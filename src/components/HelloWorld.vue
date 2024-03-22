<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-color-background">
      <div class=" container-fluid">
        <a class="navbar-brand text-color-logotext" href="#">prog_courses</a>
        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
          <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

:root {
  --text: #EDF4F8;
  --background: #0E243A;
  --primary: #2985C2;
  --secondary: #125581;
  --accent: #0b3ca6;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  /* color: #42b983; */
  color: var(--text);

}

.text-button {
  color: var(--text);
}

.text-color-text {
  color: var(--text);
}

.text-color-logotext {
  color: var(--logotext);
}

.bg-color-background{
  background-color: var(--background);
}

</style>

