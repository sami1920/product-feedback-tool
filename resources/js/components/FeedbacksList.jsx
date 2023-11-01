import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Feedback from "./Feedback";

function FeedbacksList() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [list, setList] = useState({
        feedbacks: {
            data: [],
        },
    });

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`/user/feedbacks?page=${pageNumber}`);
        setList({
            feedbacks: await api.json(),
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const viewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setShowFeedback(true);
    };

    const handleCloseFeedback = () => {
        setSelectedFeedback(null);
        setShowFeedback(false);
    };

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center my-5">
                <div className="col-md-10 col-sm-12 px-5">
                    <h2>Feedbacks List</h2>
                    <Table striped bordered hover className="my-3">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Votes</th>
                                <th>Author</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.feedbacks?.data ? (
                                list?.feedbacks?.data?.map((feedback) => (
                                    <tr key={feedback?.id}>
                                        <td>{feedback?.title}</td>
                                        <td>
                                            <Badge bg="success">
                                                {feedback?.category}
                                            </Badge>
                                        </td>
                                        <td>
                                            {feedback?.votes_count}
                                        </td>
                                        <td>{feedback?.user.name}</td>
                                        <td>
                                            <Button size="sm" variant="primary" onClick={() => {viewFeedback(feedback)}}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Loading...</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={
                                list?.feedbacks?.current_page
                                    ? list?.feedbacks?.current_page
                                    : 0
                            }
                            itemsCountPerPage={
                                list?.feedbacks?.per_page
                                    ? list?.feedbacks?.per_page
                                    : 0
                            }
                            totalItemsCount={
                                list?.feedbacks?.total
                                    ? list?.feedbacks?.total
                                    : 0
                            }
                            onChange={(pageNumber) => {
                                fetchData(pageNumber);
                            }}
                            pageRangeDisplayed={8}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First Page"
                            lastPageText="Last Lage"
                        />
                    </div>
                    {showFeedback && (
                        <Feedback
                            feedback={selectedFeedback}
                            onClose={handleCloseFeedback}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default FeedbacksList;

if (document.getElementById("user-panel")) {
    const Index = ReactDOM.createRoot(document.getElementById("user-panel"));
    Index.render(
        <React.StrictMode>
            <FeedbacksList />
        </React.StrictMode>
    );
}
