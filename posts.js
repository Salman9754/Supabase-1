let postContent = document.getElementById("postContent");
let postFile = document.getElementById("postFile");
let postButton = document.getElementById("postBtn");
let postsContainer = document.getElementById("posts-container");



async function addPost() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    try {
        const { data, error } = await supabase
            .from('postsData')
            .insert({ content: postContent.value, userId: currentUser.userId })
            .select()
        if (error) throw error
        if (data) {
            if (postFile.files.length > 0) {
                let currentFile = postFile.files[0]
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
                        postImgPublicUrl(postImgData, data)
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

async function postImgPublicUrl(ImgData, postData) {
    try {
        const { data, error } = supabase
            .storage
            .from('posts')
            .getPublicUrl(ImgData.path)
        if (error) throw error
        if (data) {
            console.log(data.publicUrl);
            try {
                const { data: postUpdateData, error: postUpdateError } =
                    await supabase
                        .from("postsData")
                        .update({ ImageUrl: data.publicUrl })
                        .eq("id", postData[0].id)
                        .select();
                if (postUpdateError) throw postUpdateError
                if (postUpdateData) {
                    console.log(postUpdateData);
                }
            } catch (error) {
                console.log(error);

            }

        }


    } catch (error) {
        console.log(error);
    }
}
postButton.addEventListener('click', addPost)