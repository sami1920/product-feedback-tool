import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FeedbacksList() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Remove the message errors while editing
        setFormErrors({
            ...formErrors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form
        const errors = {};
        if (!formData.title) {
            errors.title = "Title is required!";
        }
        if (!formData.category) {
            errors.category = "Category is required!";
        }
        if (!formData.description) {
            errors.description = "Description is required!";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Submit the form if no errors
            fetch("/user/feedback/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.head.querySelector(
                        'meta[name="csrf-token"]'
                    )?.content,
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    setFormData({
                        title: "",
                        category: "",
                        description: "",
                    });
                    toast.success('Feedback Submitted Successfully!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                .catch((error) => {
                    toast.error('Something went wrong!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
        }
    };

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center my-5">
                <div className="col-md-7 col-sm-12">
                    <h2>Feedback Submission</h2>
                    <div className="border border-2 border-dark rounded-3 p-3">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Enter title here"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                                <div className="text-danger">
                                    {formErrors.title}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name="category"
                                    aria-label="Default select example"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select category</option>
                                    <option value="bug">Bug</option>
                                    <option value="feature">Feature</option>
                                    <option value="improvement">
                                        Improvement
                                    </option>
                                </Form.Select>
                                <div className="text-danger">
                                    {formErrors.category}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    placeholder="Enter description here"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                                <div className="text-danger">
                                    {formErrors.description}
                                </div>
                            </Form.Group>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="mb-3"
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default FeedbacksList;

if (document.getElementById("feedback-form")) {
    const Index = ReactDOM.createRoot(document.getElementById("feedback-form"));
    Index.render(
        <React.StrictMode>
            <FeedbacksList />
        </React.StrictMode>
    );
}
