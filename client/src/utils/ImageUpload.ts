export const checkImage = (file: File) => {
    let err = ''
    if(!file) return err = "File does not exits."
    if(file.size > 1024 * 1024) //1mb
        err = 'The largest images size is 1MB'
    return err
}

export const imageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "cr2f3smz")
    formData.append("cloudname", "dbk7fpvvu")
    const res = await fetch("https://api.cloudinary.com/v1_1/dbk7fpvvu/upload", {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    return {public_id: data.public_id, url: data.secure_url}
}