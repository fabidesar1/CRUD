async function displayUserInfo() {
    try {
        const response = await axios.get('/api/user'); 
        const userData = response.data;
        if (userData && userData.username) {
            document.getElementById('displayName').innerText = userData.username;
            document.getElementById('perfil').innerHTML = `<a href="/perfil/${userData.username}"><li class="py-2 hover:bg-gray-700 px-4 rounded">Meu Perfil</li></a>`
        }
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
    }
}

async function logout() {
    try {
        const response = await axios.post('/api/logout');
        if (response.status === 200) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Não foi possível fazer logout. Tente novamente.');
    }
}

async function fetchPosts() {
    try {

        const username = window.location.pathname.split('/').pop(); 
        console.log("Fetching posts for username:", username); 

        const response = await axios.get(`/api/posts/${username}`);
        const posts = response.data;

        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';


        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>Nenhum post encontrado.</p>';
            return;
        }


        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.id = `post-${post._id}`;

            postElement.innerHTML = `
                <div class="space-y-4 mt-4">
                    <div class="bg-gray-800 p-4 rounded-lg shadow-md">
                        <a href="/perfil/${post.username}" class="text-blue-500 hover:underline"><h1 class='text-xl mb-3'>@${post.username}</h1></a>
                        <p class='mb-3'>${post.description}</p>
                        ${post.url ? `<img src="${post.url}" class="w-96 h-auto rounded-lg mt-2 mb-4"/>` : ''}
                        <span>${post.createdAt}</span>
                        <button class="ml-5" onclick="deletePost('${post._id}')">Deletar</button>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Axios error:', error);
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    }
}


function editPost(postId, currentDescription, currentUrl) {
    const postElement = document.getElementById(`post-${postId}`);
    postElement.innerHTML = `
        <textarea id="editDescription-${postId}" class="bg-gray-800 p-2 w-full rounded-lg">${currentDescription}</textarea>
        <input id="editUrl-${postId}" class="bg-gray-800 p-2 w-full rounded-lg mt-2" value="${currentUrl || ''}" placeholder="Link da imagem (opcional)" />
        <button class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mt-3" onclick="saveEdit('${postId}')">Salvar</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-3 ml-2" onclick="cancelEdit('${postId}', '${currentDescription}', '${currentUrl || ''}')">Cancelar</button>
    `;
}

async function cancelEdit(){
    window.location.reload();
}

async function saveEdit(postId) {
    const description = document.getElementById(`editDescription-${postId}`).value;
    const url = document.getElementById(`editUrl-${postId}`).value;

    try {
        await axios.put(`/api/posts/${postId}`, { description, url });
        fetchPosts();
    } catch (error) {
        console.error('Erro ao salvar a edição:', error);
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE',
        });

        window.location.reload();
    } catch (error) {
        console.error('Erro ao deletar o post:', error);
    }
}

window.onload = function() {
    displayUserInfo(); 
    fetchPosts(); 
};
