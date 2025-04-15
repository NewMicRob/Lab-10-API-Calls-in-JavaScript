document.getElementById("fetchBtn").addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if(!response.ok) {
            throw new Error ('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayData1(data);
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        alert(`Fetch Error: ${error}`);
    });
});

function displayData1(data) {
    const fetchedData = document.getElementById('fetchDiv');
    fetchedData.innerHTML = '';
    const title = document.createElement('h3');
    title.textContent = data.title;
    const body = document.createElement('p');
    body.textContent = data.body;
    fetchedData.appendChild(title);
    fetchedData.appendChild(body);
}

document.getElementById("xhrBtn").addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayData2(data);
            } else {
                console.error('Error fetching data: ', xhr.statusText);
                alert(`XHR Error: ${xhr.status} : ${xhr.statusText}`);
            }
        }
    };
    xhr.send();
});

function displayData2(data) {
    const xhrData = document.getElementById('xhrDiv');
    xhrData.innerHTML = '';
    const title = document.createElement('h3');
    title.textContent = data.title;
    const body = document.createElement('p');
    body.textContent = data.body;
    xhrData.appendChild(title);
    xhrData.appendChild(body);
}

const form = document.getElementById('formPost');
const titleInput = document.getElementById('formTitle');
const bodyInput = document.getElementById('formBody');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const postData = {
        title: titleInput.value,
        body: bodyInput.value,
    };
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            const error = 'HTTP Error';
            console.error('Fetch Error');
            throw new Error(error);
        }
        const reponseData = await response.json();
        alert(`POST Successful Title: ${titleInput.value}, Body: ${bodyInput.value}`);
        form.reset();
    } catch (error) {
        console.error('Fetch Error: ', error);
        alert(`FETCH Error. Network Error: ${error}`);
    }
});

document.getElementById('upBtn').addEventListener('click', function() {
    const upIdInput = document.getElementById('formUpId');
    const formUpTitle = document.getElementById('formUpTitle');
    const formUpBody = document.getElementById('formUpBody');
    const upDiv = document.getElementById('updatedForm');
    const id = upIdInput.value;
    const title = formUpTitle.value;
    const body = formUpBody.value;
    
    if (!id) {
        alert('Error. Include an id');
        return;
    } else if (isNaN(id)) {
        alert('Error. Id must be a number');
        return
    }
    
    const xhr = new XMLHttpRequest();
    const site = `https://jsonplaceholder.typicode.com/posts/${id}`;
    
    xhr.open('PUT', site, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if ( xhr.status === 200) {
                const updateData = JSON.parse(xhr.responseText);
                console.log('Response: ', updateData);
                upDiv.innerHTML = `<h2>Updated ${updateData.id}</h2>
                                    <h3>Title: ${updateData.title}</h3>
                                    <p>Body: ${updateData.body}</p>`;
            } else {
                console.error('PUT Error:', xhr.statusText);
                upDiv.innerHTML = '';
                alert(`UPDATE Error status: ${xhr.status} : ${xhr.statusText}`);
            }
        }
    };
    
    const data = JSON.stringify( {
        id: id,
        title: title,
        body: body,
    });
    xhr.send(data);
});

document.getElementById('delete').addEventListener('click', function() {
    fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Delete successful');
            alert('DELETE Successful');
        } else {
            console.error('Error: Did not delete');
            alert('DELETE Unsuccessful');
        }
    })
    .catch(error => {
        console.error('Deletion unsuccessful: ', error);
        alert('ERROR: Did Not Delete')
    });
});