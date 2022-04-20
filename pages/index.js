import { Image, Transformation } from 'cloudinary-react';
import  { useRef } from 'react';

export default function Home() {

  function readFile(file) {
    console.log("readFile()=>", file);
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }

  const uploadHandler = async (base64) => {
    const image = document.getElementById("image"); 
      console.log("Uploading", image.src)
      try {
        fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: image.src }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("upload complete")
          });
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="container">
      <h1>Create a Nextjs face detector with Cloudinary</h1>
      <div className="row">
        <div className="column">
          <img width="550" height="400" src="https://res.cloudinary.com/dogjmmett/image/upload/v1649911466/officelady.jpg" />
        </div>
        <div className="column">
          <Image
            id="image"
            cloudName="dogjmmett"
            secure={true}
            upload_preset="my_unsigned_preset"
            publicId="officelady"
          >
            <Transformation width="200" height="200" gravity="face" crop="thumb" />
          </Image><br />
          <button  >Upload</button>
        </div>
      </div>
    </div >
  )
};


                          