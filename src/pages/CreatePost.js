import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {} from '@mui/icons-material';
import './create-post.css';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import { storage } from './firebase';
import { async } from '@firebase/util';
import { useDispatch } from 'react-redux';
import { createPostByUser } from '../redux/apis';
import { useParams } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [editor, setEditor] = useState("");
  let local = JSON.parse(localStorage.getItem('login'));
  let id = local.idUser
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleChangeFileBase = (event) => {
    setFile(event.target.files[0]);
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
                setFile(url)
            });
        }
    );
  }

  const changeEditor = (e) => {
    setEditor(e);
  }
  const handleCreatePostByUser = (id, values) => {
    console.log(values);
    dispatch(createPostByUser(id, values))
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Formik
        initialValues={{ 
          title: "",
          summary: "",
          content: {editor},
          avatar: "",
          accessModified: "",
        }}
       validate={values => {
         const errors = {};
         if (!values.title) {
          errors.title = 'Không được để trống tiêu đề';
         } 
         if (!values.content) {
          errors.content = "Không được để trống nội dung"
         }
         return errors;
       }}
       onSubmit={(values) => {
        values.avatar = file
        values.content = editor;
        handleCreatePostByUser(id, values); 
       }}
     >
       {({ isSubmitting }) => (
          <Form className="container">
            Tiêu đề
            <Field name="title" className="inputTextSelect" />
            <ErrorMessage className="error" name="title" component="div" />
            <br/>
            Mô tả ngắn
            <Field name="summary" className="inputTextSelect" />
            <ErrorMessage className="error" name="summary" component="div" />
            <br/>
            Nội dung bài viết
            <Field name="content" onChange={(e) => changeEditor(e)} className="inputTextSelect">
              {({field, meta}) => (
                <div>
                  <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        selector: 'textarea#file-picker',
                        plugins: 'image code',
                        toolbar: 'undo redo | link image | code',
                        /* enable title field in the Image dialog*/
                        image_title: true,
                        /* enable automatic uploads of images represented by blob or data URIs*/
                        automatic_uploads: true,
                        /*
                          URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                          images_upload_url: 'postAcceptor.php',
                          here we add custom filepicker only to Image dialog
                        */
                        file_picker_types: 'image',
                        /* and here's our custom image picker*/
                        file_picker_callback: function (cb, value, meta) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');

                            /*
                              Note: In modern browsers input[type="file"] is functional without
                              even adding it to the DOM, but that might not be the case in some older
                              or quirky browsers like IE, so you might want to add it to the DOM
                              just in case, and visually hide it. And do not forget do remove it
                              once you do not need it anymore.
                            */

                            input.onchange = function () {
                                var file = this.files[0];

                                var reader = new FileReader();
                                reader.onload = function () {
                                    /*
                                      Note: Now we need to register the blob in TinyMCEs image blob
                                      registry. In the next release this part hopefully won't be
                                      necessary, as we are looking to handle it internally.
                                    */
                                    var id = 'blobid' + (new Date()).getTime();
                                    var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                                    var base64 = reader.result.split(',')[1];
                                    var blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);

                                    /* call the callback and populate the Title field with the file name */
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
            <Field type="file" name="avatar" onChange={handleChangeFileBase}/>
            <br/>
            Quyền
            <Field name="accessModified" as="select" className="inputTextSelect">
              <option>--Chọn quyền--</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </Field>
            <ErrorMessage className="error" name="accessModified"  component="div" />
            <br/>
            <button type="submit" className="inputSubmit" disabled={isSubmitting}>
              Create
            </button>
         </Form>
       )}
     </Formik>
    </Box>
  );
}
