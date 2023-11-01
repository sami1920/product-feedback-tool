import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback({ feedback, onClose }) {
    const submitVote = () => {
        fetch("/user/vote/store/" + feedback.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.head.querySelector(
                    'meta[name="csrf-token"]'
                )?.content,
            }
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
                        <Button variant="secondary" size="sm" onClick={submitVote}>
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
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default Feedback;
