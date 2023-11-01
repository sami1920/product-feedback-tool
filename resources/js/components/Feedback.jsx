import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Mention,
    MentionsInput,
} from "react-mentions/dist/react-mentions.cjs.prod";
import styles from "../../css/styles.module.css";

function Feedback({ feedback, onClose }) {
    const [comment, setComment] = useState("");
    const [data, setData] = useState([]);
    const token = document.head.querySelector(
        'meta[name="csrf-token"]'
    )?.content;

    const fetchUsers = async (pageNumber = 1) => {
        const api = await fetch("/users/list");
        const userData = await api.json();

        // Transform the fetched user data into the required format
        const transformedData = userData.map((user) => ({
            id: user,
            display: user,
        }));

        setData(transformedData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const submitVote = () => {
        fetch("/user/vote/store/" + feedback.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token,
            },
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Vote Submitted Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error("You have already submitted the vote!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch((error) => {
                toast.error("Something went wrong!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    const submitComment = () => {
        if (comment) {
            fetch("/user/submit-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({
                    data: comment,
                    feedback_id: feedback.id
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setComment('');
                        toast.success("Comment Submitted Successfully!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else {
                        toast.error("Admin has turned off comments!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
                .catch((error) => {
                    toast.error("Something went wrong!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                });
        }
    };

    return (
        <>
            <Modal show={true} onHide={onClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{feedback.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <h5 className="m-0">Category:</h5>
                            <Badge bg="success">{feedback?.category}</Badge>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={submitVote}
                        >
                            Vote
                        </Button>
                    </div>
                    <div className="row mt-3">
                        <h5>Description:</h5>
                        <p>{feedback.description}</p>
                    </div>
                    <hr />
                    <div className="row">
                        <h3 className="text-center">Add Comment</h3>
                        <div className="richtextarea px-5">
                            <p className="text-gray">
                                Use @ for mentioning users.
                            </p>
                            <MentionsInput
                                classNames={styles}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >
                                <Mention
                                    data={data}
                                    className="text-bold fs-10"
                                />
                            </MentionsInput>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <Button variant="success" onClick={submitComment}>
                            Submit
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default Feedback;
