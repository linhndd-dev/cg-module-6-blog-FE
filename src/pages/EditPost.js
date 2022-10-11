import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Container, CssBaseline, FormControl } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {} from "@mui/icons-material";
import "./create-post.css";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebase";
import { async } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createMyPost, editPost } from "../redux/apis";
import { getDetailPost } from "../redux/apis";
import SearchIcon from "@mui/icons-material/Search";
import { getAllTags } from "../redux/tagApi";

export default function CreatePost() {
  const [file, setSelectedFile] = useState("");
  const [preview, setPreview] = useState(0);
  const [editor, setEditor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  let { id } = useParams();
  let { post } = useSelector((state) => state.post);
  const changeEditor = (e) => {
    setEditor(e);
  };
  useEffect(() => {
    if (!file) {
      setPreview(post.avatar);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  
  const handleChangeFileBase = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleCreatePostByUser = async (values) => {
    await dispatch(editPost({ values, id }));
    navigate("/post/list");
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{width: "1000px"}}>
        <Box >
          <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
            <Box
              display="grid"
              gridColumn="span 10"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={3}
              marginBottom={"20px"}
            >
              <Box
                gridColumn="span 6"
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <h2>Edit Post</h2>
              </Box>
            </Box>
            <Formik
              initialValues={{
                title: post.title,
                summary: post.summary,
                content: { editor },
                avatar: "",
                accessModified: post.accessModified,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Require";
                }
                return errors;
              }}
              onSubmit={(values) => {
                if (editor == "") {
                  values.content = post.content;
                  console.log(1, values);
                } else {
                  values.content = editor;
                  console.log(2, values);
                }
                if (!file) {
                  values.avatar = post.avatar;
                  handleCreatePostByUser(values);
                } else {
                  const storageRef = ref(storage, `/files/${file.name}`);
                  uploadBytes(storageRef, file).then(async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then((url) => {
                      values.avatar = url;
                      handleCreatePostByUser(values);
                    });
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="container">
                  Title
                  <Field name="title" className="inputText" />
                  <ErrorMessage
                    className="error"
                    name="title"
                    component="div"
                  />
                  <br />
                  Summary
                  <br />
                  <Field
                    name="summary"
                    className="inputTextarea"
                    style={{ rows: "4", cols: "50" }}
                    component="textarea"
                  />
                  <ErrorMessage
                    className="error"
                    name="summary"
                    component="div"
                  />
                  <br />
                  Avatar
                  <br />
                  <Field
                    type="file"
                    name="avatar"
                    onChange={handleChangeFileBase}
                    style={{color: "transparent"}}
                    />
                    <Box sx={{width:"200px", height:"120px"}}>
                    {file && <img width="200px" height="150px" src={preview} />}
                    </Box>
                    <br />
                    <br />
                    <Field
                    name="accessModified"
                    as="select"
                    className="inputTextSelect"
                  >
                    <option>--Access Modified--</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </Field>
                  <br />
                  <br />
                  Content
                  <Field
                    name="content"
                    onChange={(e) => changeEditor(e)}
                    className="inputText"
                  >
                    {({ field, meta }) => (
                      <div>
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={post.content}
                          init={{
                            selector: "textarea#file-picker",
                            plugins: "image code",
                            toolbar: "undo redo | link image | code",
                            image_title: true,
                            automatic_uploads: true,
                            file_picker_types: "image",
                            file_picker_callback: function (cb, value, meta) {
                              var input = document.createElement("input");
                              input.setAttribute("type", "file");
                              input.setAttribute("accept", "image/*");
                              input.onchange = function () {
                                var file = this.files[0];

                                var reader = new FileReader();
                                reader.onload = function () {
                                  var id = "blobid" + new Date().getTime();
                                  var blobCache =
                                    window.tinymce.activeEditor.editorUpload
                                      .blobCache;
                                  var base64 = reader.result.split(",")[1];
                                  var blobInfo = blobCache.create(
                                    id,
                                    file,
                                    base64
                                  );
                                  blobCache.add(blobInfo);
                                  cb(blobInfo.blobUri(), { title: file.name });
                                };
                                reader.readAsDataURL(file);
                              };
                              input.click();
                            },
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          onEditorChange={(e) => {
                            changeEditor(e);
                          }}
                        />
                      </div>
                    )}
                  </Field>
                  <br />
                  <button
                    type="submit"
                    className="inputSubmit"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
