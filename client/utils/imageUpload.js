export const imageUpload=async(images)=>{
    let imgArr=[];

    for(const image of images){
        const formData=new FormData();
        const uri=image.uri.split('.');
        const fileType=uri[uri.length-1];
        const file=`data:${fileType};base64,${image.base64}`;


        formData.append("file",file);
        formData.append("upload_preset", "irbytja4");
        formData.append("cloud_name", "dswg5in7u");

        const res=await fetch("https://api.cloudinary.com/v1_1/dswg5in7u/image/upload",{
            method:"POST",
            body:formData
        })

        const data=await res.json();

        imgArr.push({
            public_id:data.public_id,
            url:data.secure_url
        })

    }
    return imgArr;
}