let postContent = document.getElementById("postContent");
let postFile = document.getElementById("postFile");
let postButton = document.getElementById("postBtn");
let postsContainer = document.getElementById("posts-container");



async function addPost() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(currentUser);
    console.log(postFile.files.length);

    try {
        const { data, error } = await supabase
            .from('postsData')
            .insert({ content: postContent.value, userId: currentUser.userId })
            .select()
        if (error) throw error
        if (data) {
            console.log(data);
            if (postFile.files.length > 0) {
                let currentFile = postFile.files[0]
                console.log(currentFile.name);

                try {
                    const { data: postImgData, error: postImgError } = await supabase
                        .storage
                        .from('posts')
                        .upload(`public/${data[0].id}`, currentFile, {
                            cacheControl: '3600',
                            upsert: false
                        })
                    if (postImgError) throw postImgError
                    if (postImgData) {
                        console.log(postImgData);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

        }
    } catch (error) {
        console.log(error);
    }

}
postButton.addEventListener('click', addPost)