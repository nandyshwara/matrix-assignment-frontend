import React, { useEffect, useState } from "react";
import Conatiner from "../Conatiner";
import {
  deleteCandidateById,
  getAllCandidates,
} from "../../services/candidate.service";
import Rating from "./Rating";
import AddCandidateModal from "./AddCandidateModal";
import Loading from "../Loading";
import toast from "react-hot-toast";
import UpdateCandidateModal from "./UpdateCandidateModal";
import Pagination from "../Pagination";

function CandidateTable() {
  const [candidatesData, setCandidatesData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderData , setRenderData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [editedCandidateData, setEditedCandidateData] = useState({
    candidateName: "",
    interviewStatus: "",
    feedback: "",
    rating: 0,
  });

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openUpdateModal = (
    candidateName,
    interviewStatus,
    feedback,
    rating,
    id
  ) => {
    setEditedCandidateData({
      _id: id,
      candidateName,
      interviewStatus,
      feedback,
      rating,
    });
    setIsUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
  };
  async function getAllCandidatesData() {
    try {
      const { data } = await getAllCandidates();
      console.log(data?.data?.candidates);
      setCandidatesData(data?.data?.candidates);
    } catch (error) {
      console.log(error);
    }
  }



  async function deleteCandidate(id) {
    try {
      setIsLoading(true);
      const { data } = await deleteCandidateById(id);
      if (data) {
        handleModalClose();
        setIsLoading(false);
      }
      toast.success("Candidate deleted succesfully");
      setRenderData(!renderData)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCandidatesData();
  }, [renderData]);

  const itemsPerPage = 5;
  const totalItems = candidatesData.length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="mt-20 pb-[5rem]">
      <Conatiner>
        {candidatesData && (
          <div className="w-8/10 mx-auto mt-[10rem]">
            <div className="mx-auto w-1/3 my-5">
              <button
                className="bg-[#5D3587] rounded-xl px-5 py-2 text-white font-bold w-full"
                onClick={() => {
                  openAddModal();
                }}
              >
                Add new Candidate
              </button>
            </div>
            {isLoading ? (
              <Loading isLoading={isLoading} />
            ) : (
              <div>
                <table class="table-auto bg-[#A367B1] rounded-xl text-white mx-auto">
                  <thead>
                    <tr>
                      <th className="px-10">Name</th>
                      <th className="px-10">Interview Status</th>
                      <th className="px-10">Interview Feedback</th>
                      <th className="px-10">Rating</th>
                      <th className="pl-10"></th>
                      <th className="pl-10"></th>
                    </tr>
                  </thead>
                  <tbody className="mt-10">
                    {candidatesData.slice(startIndex, endIndex).map((candidate, index) => (
                      <tr key={index}>
                        <td className="px-10 py-2">
                          {candidate.candidateName}
                        </td>
                        <td className="px-10 py-2">
                          <p className="px-2 py-1 bg-[#5D3587] rounded-xl text-center">
                            {candidate.interviewStatus}
                          </p>
                        </td>
                        <td className="px-10 py-2">{candidate.feedback}</td>
                        <td className="px-10 py-2">
                          <Rating number={candidate.rating} />
                        </td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="red"
                            class="w-6 h-6"
                            onClick={() => deleteCandidate(candidate._id)}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            onClick={() =>
                              openUpdateModal(
                                candidate.candidateName,
                                candidate.interviewStatus,
                                candidate.feedback,
                                candidate.rating,
                                candidate._id
                              )
                            }
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </Conatiner>
      {isAddModalOpen && (
        <AddCandidateModal
          IsModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          onModalClose={handleModalClose}
          renderData = {renderData}
          setRenderData={setRenderData}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateCandidateModal
          IsModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          onModalClose={handleModalClose}
          editedCandidateData={editedCandidateData}
          setEditedCandidateData={setEditedCandidateData}
          renderData = {renderData}
          setRenderData={setRenderData}
        />
      )}
      <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
    </div>
  );
}

export default CandidateTable;
