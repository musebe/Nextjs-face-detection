### Create a Nextjs face detector with Cloudinary


## Introduction

This article demonstrates how to apply a face detection transformation on custom inmages using cloudinary sdk.

## Codesandbox

Check the sandbox demo on  [Codesandbox](/).

<CodeSandbox
title="mergevideos"
id=" "
/>

You can also get the project github repo using [Github](/).

## Prerequisites
Entry-level javascript and React/Nextjs knowledge.

## Cloudinary
[Cloudinary](https://cloudinary.com/?ap=em) reffers to an end-to-end image and video management solution for websites and mobile applications. This involves services such as storage, uploads, mnipulations e.t.c 
What we will be achieving today is using Cloudinary React SDK  to achieve face transformation feature for a custom image[Cloudinary](https://cloudinary.com/?ap=em). This project will also store the processed image online using the same sdk.

## Setting Up the Sample Project

Begin with creating a Nextjs project through your terminal using `npx create-next-app facerecognition`.

Head to your project: `cd facerecognition`

We will include all our frontend code in the index component. Before you start ensure to include `cloudinary-react` in your project dependencies: `npm install cloudinary-react`.

Next, we will need the following elements:

    - Image => To define an image tag with
    - Transformation => Allows us to define our transformation on the parent element.

To trasform an image using cloudinary-react sdk, we need to first upload it to cloudinary media servers. There are three ways to achieve this: `upload widget`, `upload endpoint` and `jQuery SDK with Blueimp File Upload adapter`.
We will go with the `upload widget` option.
First, Use this [link](https://cloudinary.com/console) to create your own cloudinary account and log into it.
Click on the `Media Library` option at the navigation bar.
![Media Library](https://res.cloudinary.com/dogjmmett/image/upload/v1650121382/media_uploads_yvy2l9.png "Media Library")
 We will use the following sample image for our transformation.

![Sample Image](https://res.cloudinary.com/dogjmmett/image/upload/v1649911466/officelady.jpg "Sample Image")

Proceed by clicking the `upload` button and select `browse` from the popup menu to select the image from your local directory.

![Browse Image](https://res.cloudinary.com/dogjmmett/image/upload/v1650121386/browse_upload_wb5qa5.png "Browse Image")

Once selected the image will be available in your cloudinary console media library.

Proceed to the `pages/ index` directoty and begin by importing the respective elements:
```
"pages/index"


 import { Image, Transformation } from 'cloudinary-react';
```

Paste the following code in your return statement.

```
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
```
The code above involves a heading tag  and a row containing two columns. One will contain the original image and the second will contain the processed  image.

Remember to include your cloudname from the cloudinary dash board to your image tag as well as the title of tour image component from your media library. For instance our name is `dogjmmett`  as shown here:

![Cloud Name](https://res.cloudinary.com/dogjmmett/image/upload/v1650192174/cloudName_bytwor.png "Cloud Name")

and the `publicId` will be the image file name on your media library as shown:

![Public id](https://res.cloudinary.com/dogjmmett/image/upload/v1650122133/imagetitle_whweuv.png "Public id").

With our transformation complete, we need to be able to upload the transformed image i.e  for future refferences.  To achieve this we will have to code our upload configuration in nextjs backend.
Create a file in your project root directory and paste the following code:

```
CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET =
```
Use the environment variables from your cloudinary dashboard to fill in the blanks above
![Dashboard](https://res.cloudinary.com/dogjmmett/image/upload/v1650192179/dashboard_d2advw.png "Dashboard")

Restart your project using `npm run dev` and

In the `pages/api` folder, create a new file named `upload.js`  and begin by configuring the environment keys and libraries.

```
var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Create a handler function to execute the POST request. The function will receive media file data and post it to the cloudinary website, Capture the media file's cloudinary link and send it back as a response.

```
export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        try {
            let fileStr = req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload_large(
                fileStr,
                {
                    resource_type: "video",
                    chunk_size: 6000000,
                }
            );
            url = uploadedResponse.url
        } catch (error) {
            res.status(500).json({ error: "Something wrong" });
        }

        res.status(200).json({data: url});
    }
}
```

 

The code above concludes our backend as well as the project itself. Ensure to test out the article to enjoy the experience.

Happy coding!