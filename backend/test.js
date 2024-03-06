import path from "path"

const files= [ 'file1.txt', 'file2.txt', 'file3.txt' ];
const filenew=[]
const fileNames=files.map((file) => {
    filenew.push(path.parse(file).name)
})
console.log(filenew)

// <% if(create) { %>
//     <h3>File name: <%= fileName %> </h3>
//     <h3>File content:</h3>
//     <p class="file-content"> <%= fileContent %> </p>
//     <a href="/" class="user-action-button">Go to Homepage</a>
//     <% } %> -->