import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import {
  ref,
  set,
  get,
  update,
  push,
  serverTimestamp,
  query,
  orderByKey,
} from "firebase/database";
import DefAvatar from "../../public/assets/images/user.png";
import { getDownloadURL, ref as refS, uploadBytes } from "@firebase/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState();
  const [blogs, setBlogs] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [savedBlog, setSavedBlog] = useState([]);
  const [userWBlogs, setUserWBlogs] = useState([]);
  // const [userSavedBlogs, setUserSavedBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUser(user.uid);
        setAvatar(DefAvatar);
        fetchBlogs();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe;
  }, [avatar, user]);

  const fetchUser = async (uid) => {
    try {
      const userRef = ref(db, "users/" + uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        const userAvatar = userData.avatar;
        const username = userData.uname;
        setUsername(username);
        setAvatar(userAvatar);
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  };

  const SignUp = async (email, password, username) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      const newUser = userCredentials.user;
      console.log(newUser, username);
      try {
        const userRef = ref(db, "users/" + newUser.uid);
        await set(userRef, {
          uname: username,
          avatar: DefAvatar,
          saved: [],
          liked: [],
          blogs: [],
        });
      } catch (error) {
        console.log(error);
      }
      toast.success("Sign up Successful");
    } catch (error) {
      const [before, after] = error.message.split(":");
      toast.error(after);
      setUser(null);
    }
  };

  const SignIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);

      const newUser = userCredentials.user;
      const userRef = ref(db, "users/" + newUser.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        const userAvatar = userData.avatar;
        setAvatar(userAvatar);
      }

      toast.success("Login Successful");
    } catch (error) {
      console.error(error);
      toast.error("Error Loggin In");
      setUser(null);
    }
  };

  const SignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Log Out Successful");
    } catch (error) {
      const [before, after] = error.message.split(":");
      toast.error(after);
      setUser(null);
      setBlogs([]);
      setSearchedBlogs([]);
      setUserWBlogs([]);
      setSavedBlog([]);
      setAvatar(null);
      setUsername("");
    }
  };

  const PostBlog = async (title, tags, content, image) => {
    try {
      if (!user) {
        toast.error("User not authenticated");
        return;
      }

      const blogRef = ref(db, "blogs");
      const newBlogPostRef = push(blogRef);
      const newBlogPostKey = newBlogPostRef.key;
      console.log(newBlogPostKey);

      try {
        if (image) {
          const imgRef = refS(storage, "posts/" + newBlogPostKey);

          const metadata = {
            contentType: image.type,
          };

          await uploadBytes(imgRef, image, metadata);
          const url = await getDownloadURL(imgRef);

          await set(newBlogPostRef, {
            blogTitle: title,
            blogTags: tags,
            blogContent: content,
            author: user.uid,
            time: serverTimestamp(),
            imageURL: url,
          });

          toast.success("Post Uploaded");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Error Uploading Blog");
    }
  };

  const hanldeAvatarChange = async (image) => {
    try {
      if (image) {
        const imgRef = refS(storage, "avatars/" + user.uid);

        const metadeta = {
          contentType: image.type,
        };

        uploadBytes(imgRef, image, metadeta).then((data) => {
          getDownloadURL(data.ref).then(async (val) => {
            try {
              const userRef = ref(db, "users/" + user.uid);
              await update(userRef, { avatar: val });
            } catch (error) {
              console.log(error);
            }
            setAvatar(val);
            toast.success("Avatar Updated!");
          });
        });
      } else {
        toast.error("Image not found");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Error updating avatar");
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogRef = ref(db, "blogs");
      const blogSnapShot = await get(blogRef);

      if (blogSnapShot.exists()) {
        const blogData = blogSnapShot.val();
        const blogArray = [];
        const newSavedBlog = [];

        await Promise.all(
          Object.keys(blogData).map(async (key) => {
            const post = blogData[key];
            const authorRef = ref(db, "users/" + post.author);
            const authorSnapShot = await get(authorRef);

            let authorData;

            if (authorSnapShot.exists()) {
              authorData = authorSnapShot.val();
            }

            let isLiked = false;

            for (let i = 0; i < (post.liked ? post.liked.length : 0); i++) {
              if (auth.currentUser.uid === post.liked[i]) {
                isLiked = true;
                break;
              }
            }

            let isSaved = false;

            if (post.saved) {
              for (let i = 0; i < post.saved.length; i++) {
                if (auth.currentUser.uid === post.saved[i]) {
                  isSaved = true;
                }
              }

              const isDuplicate = newSavedBlog.some((blog) => blog.key === key);

              if (!isDuplicate) {
                newSavedBlog.unshift({
                  key: key,
                  blogTitle: post.blogTitle,
                  blogTags: post.blogTags,
                  blogContent: post.blogContent,
                  authorName: authorData.uname,
                  authorAvatar: authorData.avatar,
                  time: post.time,
                  imageURL: post.imageURL,
                  Liked: isLiked,
                  saved: isSaved,
                });
              }
            }

            blogArray.unshift({
              key: key,
              blogTitle: post.blogTitle,
              blogTags: post.blogTags,
              blogContent: post.blogContent,
              authorName: authorData.uname,
              authorAvatar: authorData.avatar,
              time: post.time,
              imageURL: post.imageURL,
              Liked: isLiked,
              saved: isSaved,
            });
          })
        );

        setSavedBlog(newSavedBlog);
        setBlogs(blogArray);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Network Error");
    }
  };

  const handleSearchBlog = async (searchTag) => {
    try {
      const blogsRef = ref(db, "blogs");
      const blogsQuery = query(blogsRef, orderByKey());

      const blogsSnapShot = await get(blogsQuery);

      if (blogsSnapShot.exists()) {
        const blogData = blogsSnapShot.val();
        let updatedBlogs = [];

        await Promise.all(
          Object.keys(blogData).map(async (key) => {
            const post = blogData[key];

            const userRef = ref(db, "users/" + post.author);
            const userSnap = await get(userRef);
            const userData = userSnap.val();
            const tagsArray = post.blogTags;

            let isLiked;

            if (user && user.uid && post.liked) {
              isLiked = post.liked.includes(user.uid);
            } else {
              isLiked = false;
            }

            for (let i = 0; i < searchTag.length; i++) {
              for (let j = 0; j < tagsArray.length; j++) {
                if ("#" + searchTag[i] === tagsArray[j]) {
                  try {
                    updatedBlogs.unshift({
                      key: key,
                      authorAvatar: userData.avatar,
                      userName: userData.uname,
                      ...post,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                  console.log("In the loop");
                }
              }
            }
          })
        );

        setSearchedBlogs(updatedBlogs);
        console.log(searchedBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userBlogs = async () => {
    try {
      const blogsRef = ref(db, "blogs");
      const blogsSnapshot = await get(blogsRef);

      if (blogsSnapshot.exists) {
        const blogsData = [];
        blogsSnapshot.forEach((blog) => {
          if (blog.val().author === user.uid) {
            blogsData.push({
              key: blog.key,
              likeCount: blog.val().liked ? blog.val().liked.length : 0,
              ...blog.val(),
            });
          }
        });
        setUserWBlogs(blogsData);
      } else {
        console.log("No blogs found for the user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeBlog = async (blogKey) => {
    try {
      const blogRef = ref(db, `blogs/${blogKey}`);
      const blogSnap = await get(blogRef);

      if (blogSnap.exists()) {
        const blogData = blogSnap.val();

        if (!blogData.liked || !blogData.liked.includes(user.uid)) {
          const updateLiked = blogData.liked
            ? [...blogData.liked, user.uid]
            : [user.uid];

          await update(blogRef, { liked: updateLiked });

          setBlogs((prevBlogs) => {
            const updatedBlogs = prevBlogs.map((prevBlog) =>
              prevBlog.key === blogKey ? { ...prevBlog, Liked: true } : prevBlog
            );
            return updatedBlogs;
          });
        } else if (blogData.liked.includes(user.uid)) {
          const updateLiked = blogData.liked.filter((uid) => uid !== user.uid);

          await update(blogRef, { liked: updateLiked });

          setBlogs((prevBlogs) => {
            const updatedBlogs = prevBlogs.map((prevBlog) =>
              prevBlog.key === blogKey
                ? { ...prevBlog, Liked: false }
                : prevBlog
            );
            return updatedBlogs;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveBlog = async (key) => {
    try {
      const blogRef = ref(db, "blogs/" + key);
      const blogSnap = await get(blogRef);
      const blogData = blogSnap.val();

      if (blogData) {
        blogData.saved = blogData.saved || [];

        if (!blogData.saved.includes(auth.currentUser.uid)) {
          blogData.saved.push(auth.currentUser.uid);

          await set(blogRef, blogData);

          setBlogs((prevBlogs) => {
            const updatedBlogs = prevBlogs.map((prevBlog) =>
              prevBlog.key === key ? { ...prevBlog, saved: true } : prevBlog
            );
            return updatedBlogs;
          });
        } else {
          blogData.saved.pop(auth.currentUser.uid);

          setBlogs((prevBlogs) => {
            const updatedBlogs = prevBlogs.map((prevBlog) =>
              prevBlog.key === key ? { ...prevBlog, saved: false } : prevBlog
            );
            return updatedBlogs;
          });

          await set(blogRef, blogData);
          console.log("Blog removed successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userSaved = async () => {
    try {
      const blogRef = ref(db, "blogs/");
      const blogSnap = await get(blogRef);
      if (blogSnap.exists()) {
        const blogData = blogSnap.val();
        const userSavedBlogs = [];

        Object.keys(blogData).forEach((key) => {
          const post = blogData[key];

          if (post.saved && post.saved.includes(auth.currentUser.uid)) {
            userSavedBlogs.push({
              key: key,
              blogTitle: post.blogTitle,
              blogTags: post.blogTags,
              blogContent: post.blogContent,
              // ... (add other properties you need)
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        avatar,
        loading,
        username,
        blogs,
        searchedBlogs,
        savedBlog,
        userWBlogs,
        SignIn,
        SignUp,
        SignOut,
        PostBlog,
        hanldeAvatarChange,
        handleSearchBlog,
        userBlogs,
        likeBlog,
        fetchBlogs,
        handleSaveBlog,
        userSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
