# myblog (full-stack)
Welcome to MyBlog, a dynamic and user-friendly platform designed to enhance your blogging experience. This full-stack project offers a seamless interface that caters to both readers and writers, making content creation and consumption enjoyable and intuitive.

# UI Preview
### Home page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/1a80d760-ee52-47ba-bffa-215827565c40)
This is the project's home page. The top navigation bar allows users to access other pages and remains fixed even when scrolling down.
The slider displays blog categories, which users can navigate by clicking the left or right arrows.
Below the slider, user-posted blogs are showcased, each featuring a cover image, title, blog snippet, and icons indicating the creation or updated date, comment count, and sharing options.

### Drop down menu
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/096811e6-b063-4c6a-bb05-c889bc14daf7)
This the drop down menu, can be accessed by clicking on the icon in the top right corner

![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/1afc14b4-d67b-449e-b990-d90a688a6f21)
If the user is logged out, the icon will change to "My Account", the user can go to log in page through it.

### Login page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/eae4d691-cc34-48e3-a77f-af5d7adb4fa8)

### Register page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/90627f2d-e45e-4da2-9169-26d5dd66e73b)

### Detail page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/9758daf5-956f-4297-8ea0-f03de0b6bbdf)
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/94631b8a-4a5e-4bb2-8851-faf38b561457)
This is the detail page for a blog, accessible by clicking on the blog's cover image or title.
Next to the title, there are two buttons: "Update Post" and "Delete Post". If the logged in user 
is also the creator of this post, they can see these buttons and update and delete this post through them.
Logged in users can also comment and like comments.

### Profile page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/2b5a7dff-ee51-4d71-9a0b-f863ece3f791)
This is the profile page, accessible by clicking on the portrait in the drop-down menu.
Here, users can update their username, email, and password.

### "Create post" page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/704cf43b-2aae-48ce-9e12-86e274a7f254)
This is the "create post" page, acessible by clicking on the "create post" in the drop down menu.
The user can select a local image as cover.

### "Update post" page
![image](https://github.com/Daniel-codeApe/Blog/assets/172876551/e3ecb1c2-a331-4a39-a5da-5d34e5bf07a0)
The creator of a post can update the post by clicking the "Update button" in details page and 
be navigated to this page. Here, the user can update the title, category, image, and content of this post.

# Project features
1. Beautiful and clear UI
2. Have pages or buttons for backend features

# Technologies used
1. React
2. react-router-dom
3. react-slick
4. Express
5. Redux
6. AWS S3
7. MongoDB

# How to run this project
### Clone the project

### Install dependencies
npm install

### Setup .env file in backend
Your MongoDB connection link -> MONGO
Your JWT secret key -> JWT_SECRET

### Setup .env file in frontend
AWS access key -> REACT_APP_AWS_ACCESS_KEY_ID & REACT_APP_AWS_SECRET_ACCESS_KEY
AWS region -> REACT_APP_AWS_REGION
AWS S3 bucket name -> REACT_APP_S3_BUCKET_NAME

### run the backend
cd .\Blog\
npm run dev

wait until "database connected" & "Server is running on port 5000" appears

## run the frontend
cd .\Blog\client
npm start
