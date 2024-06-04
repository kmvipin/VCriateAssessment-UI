import { privateAxios, myAxios } from "./helper";

export const uploadFile = async (formdata, setProgress) =>{
    try{
        const response = await privateAxios.post(
            `/api/file/upload`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percent = Math.floor((loaded * 100) / total);
                setProgress(percent);
              }
            },
        );
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const getAllFileName = async () =>{
    try{
        const response = await privateAxios.get(
            `/api/file/info`
        );
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const downloadFile = async (filename, setProgress) =>{
    try{
        const response = await privateAxios.get(`/api/file/download/${filename}`, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const percent = Math.floor((loaded * 100) / total);
              setProgress(percent);
            }
          });
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const deleteFile = async (filename) =>{
    try{
        const response = await privateAxios.delete(`/api/file/delete/${filename}`);
        return response.data;
    }
    catch(err){
        throw err;
    }
}