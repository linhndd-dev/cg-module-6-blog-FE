import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {} from '@mui/icons-material';
import './create-post.css';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { storage } from './firebase';
import { async } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createMyPost, editPost } from '../redux/apis';
import { getDetailPost } from '../redux/apis';

export default function EditPost() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [editor, setEditor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  let {id} = useParams();
  let {post} = useSelector(state => state.post)
  const handleChangeFileBase = (event) => {
    setFile(event.target.files[0]);
  }

  const changeEditor = (e) => {
    setEditor(e);
  }
  const handleCreatePostByUser = async (values) => {
    await dispatch(editPost({values, id}));
    navigate('/post/list')
  }
  useEffect(() => {
    dispatch(getDetailPost(id))
  },[])
  
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <h2>Edit Post</h2>
      <Formik
        initialValues={{ 
          title: post.title,
          summary: post.summary,
          content: {editor},
          avatar: "",
          accessModified: post.accessModified,
        }}
       validate={values => {
         const errors = {};
         if (!values.title) {
          errors.title = 'Require';
         } 
         if (!values.content) {
          errors.content = "Require"
         }
         return errors;
       }}
       onSubmit={(values) => {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    values.avatar = url
                    values.content = editor;
                    handleCreatePostByUser(values); 
                });
            }
        );
       }}
     >
       {({ isSubmitting }) => (
          <Form className="container">
            Title
            <Field name="title" className="inputTextSelect" />
            <ErrorMessage className="error" name="title" component="div" />
            <br/>
            Sumary
            <Field name="summary" className="inputTextSelect" />
            <ErrorMessage className="error" name="summary" component="div" />
            <br/>
            Content
            <Field name="content" onChange={(e) => changeEditor(e)} className="inputTextSelect">
              {({field, meta}) => (
                <div>
                  <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={post.content}
                    init={{
                        selector: 'textarea#file-picker',
                        plugins: 'image code',
                        toolbar: 'undo redo | link image | code',
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        file_picker_callback: function (cb, value, meta) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.onchange = function () {
                                var file = this.files[0];

                                var reader = new FileReader();
                                reader.onload = function () {
                                    var id = 'blobid' + (new Date()).getTime();
                                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                                    var base64 = reader.result.split(',')[1];
                                    var blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);
                                    cb(blobInfo.blobUri(), { title: file.name });
                                };
                                reader.readAsDataURL(file);
                            };
                            input.click();
                        },
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(e) => {
                      changeEditor(e);
                  }}
                />
                </div>
              )}
            </Field>
            <ErrorMessage className="error" name="content" component="div" />
            <br/>
            Avatar
            <br/>
            <Field type="file" name="avatar" onChange={handleChangeFileBase} accept="/image/*"/>
            <br/>
            <br/>
            <Field name="accessModified" as="select" className="inputTextSelect">
              <option>-- Access Modified --</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Field>
            <ErrorMessage className="error" name="accessModified"  component="div" />
            <br/>
            <button type="submit" className="inputSubmit" disabled={isSubmitting}>
              Update
            </button>
         </Form>
       )}
     </Formik>
    </Box>
  );
}
