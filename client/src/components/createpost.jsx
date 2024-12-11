import React from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import Input from "./common/input";
import Form from "./common/form";
import http from "../services/httpService";
import { api } from "../config.js";
import { createpost } from "../services/postCreateService";
import "../utils/newPost.css"; // Assuming you're using an external CSS file for custom styles

class NewPost extends Form {
  state = {
    data: { title: "", description: "", tags: [] },
    errors: { title: "", description: "", tags: [] },
    tags: [],
  };

  schema = {
    title: Joi.string().required().min(10).label("Title"),
    description: Joi.string().required().min(5).label("Description"),
    tags: Joi.array(),
  };

  handleTagChange = (tagID) => {
    let data = this.state.data;
    const newTags = data.tags;
    const index = newTags.indexOf(tagID);
    if (index === -1) newTags.push(tagID);
    else newTags.splice(index, 1);
    data = { title: data.title, description: data.description, tags: newTags };
    this.setState({ data });
  };

  async componentDidMount() {
    let tags = await http.get(api.tagsEndPoint);
    try {
      this.setState({ tags: tags.data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Post Validation Failed!");
      }
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { response } = await createpost(data);
      window.location = "/dashboard";
    } catch (ex) {}
  };

  render() {
    const { data, errors, tags } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-lg">
          <h1 className="text-center m-4">Create a New Discussion</h1>
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <Input
                value={data.title}
                onChange={this.handleChange}
                label="Title"
                name="title"
                type="text"
                error={errors.title}
              />
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleChange}
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Write your description here..."
                />
                {errors.description && (
                  <div className="error">{errors.description}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="tags">Related Tags</label>
                <div className="tags-container">
                  {tags.map((tag) => (
                    <label key={tag._id} className="tag-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => this.handleTagChange(tag._id)}
                      />
                      {tag.name}
                    </label>
                  ))}
                </div>
                {errors.tags && <div className="error">{errors.tags}</div>}
              </div>
              <div className="text-center">
                <button
                  className="btn btn-submit mt-4"
                  disabled={this.validate()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPost;
