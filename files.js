// profile Dp code

let uploadBtn = document.getElementById('upload-img-btn')
let fileUpload = document.getElementById('fileUpload')
const timestamp = Date.now(); 


async function uploadFile() {
    try {
        let uploadedFile = fileUpload.files[0]
        const { data, error } = await supabase
            .storage
            .from('usersProfiles')
            .upload(`public/${timestamp}_${uploadedFile.name}`, uploadedFile, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) throw error
        if (data) {
            customAlert('success', 'Done', 'Image Uploaded')
            window.location.reload()
        }

    } catch (error) {
        console.log(error);

    }

}
async function getAllFile() {
    try {

        const { data, error } = await supabase
            .storage
            .from('usersProfiles')
            .list('public', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'desc' },
            })
        if (error) throw error
        if (data) {
            // console.log(data);
            try {
                const { data: filesData, error: filesError } = supabase
                    .storage
                    .from('usersProfiles')
                    .getPublicUrl(`public/${data[1].name}`)
                if (filesError) throw filesError
                if (filesData) {
                    // console.log(filesData.publicUrl);
                    
                }
            } catch (error) {
                console.log(error);

            }
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = getAllFile
uploadBtn.addEventListener('click', uploadFile)