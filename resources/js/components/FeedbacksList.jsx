import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Pagination from "react-js-pagination";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';

function FeedbacksList() {
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

    useEffect(() => {
        console.log(list);
    }, [list]);

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center my-5">
                <div className="col-md-7 col-sm-12">
                    <h2>Feedbacks List</h2>
                    <Table striped bordered hover className="my-3">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Submitted By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list?.feedbacks?.data ? (
                                list?.feedbacks?.data?.map((feedback) => (
                                    <tr key={feedback?.id}>
                                        <td>{feedback?.title}</td>
                                        <td><Badge bg="success">{feedback?.category}</Badge></td>
                                        <td>{feedback?.description.substring(0,8)}...</td>
                                        <td>{feedback?.user.name}</td>
                                        <td>
                                            <Button size="sm" variant="primary">View</Button>
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
