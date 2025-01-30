let postContent = document.getElementById("postContent");
let postFile = document.getElementById("postFile");
let postButton = document.getElementById("postBtn");
let postsContainer = document.getElementById("posts-container");
let profileImg = document.getElementsByClassName('profileImg')
window.profileImg = profileImg



async function addPost() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    try {
        const { data, error } = await supabase
            .from("postsData")
            .insert({ content: postContent.value, userId: currentUser.userId })
            .select();
        if (error) throw error;
        if (data) {
            if (postFile.files.length > 0) {
                let currentFile = postFile.files[0];
                try {
                    const { data: postImgData, error: postImgError } =
                        await supabase.storage
                            .from("posts")
                            .upload(`public/${data[0].id}`, currentFile, {
                                cacheControl: "3600",
                                upsert: false,
                            });
                    if (postImgError) throw postImgError;
                    if (postImgData) {
                        postImgPublicUrl(postImgData, data);
                        loadPosts();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function postImgPublicUrl(ImgData, postData) {
    try {
        const { data, error } = supabase.storage
            .from("posts")
            .getPublicUrl(ImgData.path);
        if (error) throw error;
        if (data) {
            console.log(data.publicUrl);
            try {
                const { data: postUpdateData, error: postUpdateError } = await supabase
                    .from("postsData")
                    .update({ ImageUrl: data.publicUrl })
                    .eq("id", postData[0].id)
                    .select();
                if (postUpdateError) throw postUpdateError;
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
async function loadPosts() {
    try {
        const { data, error } = await supabase.from("postsData").select();
        if (error) throw error;
        if (data) {
            console.log(data);
            try {
                const { data: userData, error: userError } = await supabase
                    .from("LoggedUsers")
                    .select();
                if (userError) throw userError;
                if (userData) {
                    let userMap = {};
                    userData.forEach((user) => {
                        userMap[user.userId] = user;
                    });
                    let myId = JSON.parse(localStorage.getItem("currentUser"));
                    data.forEach((post) => {
                        let myPost = false;
                        let currentUser = userMap[post.userId];
                        if (currentUser.userId === myId.userId) {
                            myPost = true;
                        }
                        postsContainer.innerHTML += `

            <div class="card w-100 my-2">

                     <div class="card-header d-flex gap-2 align-items-start">
                         <div>
                             <img class="mt-1 profileImg" src="" width="30" height="30" alt="">
                         </div>
                         <div class="d-flex flex-column ">
                             <h5 class="card-title p-0 m-0">${currentUser.name
                            }</h5>
                             <small> ${new Date(
                                post.created_at
                            ).toLocaleString()}  </small>
                         </div>


                         ${myPost ? `<button onclick="deleteMyPost(${post.id})" >Delete </button> `
                                : ""
                            }
                     </div>
                     <div class="card-body">

                         <p class="card-text"> ${post.content}
                         </p>
                         <img style="width: 100%; "
                             src="${post.ImageUrl}"
                             alt="">
                     </div>
                 </div>
           `;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
loadPosts();
async function deleteMyPost(postId) {
    try {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const { data, error } = await supabase
                        .from('postsData')
                        .delete()
                        .eq('id', postId)
                        .select()
                    if (error) throw error
                    if (data) {
                        console.log(data);
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    }
                }
            });
    } catch (error) {
        console.log(error);
    }
}
window.deleteMyPost = deleteMyPost;
postButton.addEventListener("click", addPost);
