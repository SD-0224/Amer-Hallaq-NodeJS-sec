const searchFiles= () => {

    const searchQuery = document.getElementById('searchInput').value;
    fetch(`/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(results => {
            console.log("this is the message",results)
            
            const resultsList = document.getElementById('searchResults');
            resultsList.innerHTML = '';
            if(results.message) {
                resultsList.textContent =results.message
                resultsList.appendChild(listItem);
            }

            else {
                results.forEach(file => {
                const listItem = document.createElement('li');
                const linkFile = document.createElement('a');
                linkFile.href='files/'+file
                linkFile.textContent=file
                listItem.appendChild(linkFile) ;
                resultsList.appendChild(listItem);
            });
            }
        })
        .catch(error => console.error('Error searching files:', error));
}

const showFormLink = document.getElementById('showForm');
const updateForm = document.getElementById('updateForm');

showFormLink.addEventListener('click', (event) => {
        event.preventDefault();
        updateForm.style.display = 'block';
});
const updateFileName= () => {
    console.log("hello there")
    const updateForm = document.getElementById('updateForm');
    const currentName=document.getElementById('currentName').value;
    console.log(currentName)
    updateForm.addEventListener('submit', (e) => {
        console.log("hello there")
        e.preventDefault();
        const newFileName = document.getElementById('updateFormName').value;
        console.log(newFileName)
        fetch(`/update/${encodeURIComponent(currentName)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newFileName })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update file name');
            }
            alert('File name updated successfully');
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error updating file name:', error);
            alert('Failed to update file name');
        });
    });

}
