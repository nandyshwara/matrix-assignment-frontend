import React, { useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateCandidate } from "../../services/candidate.service";
import Loading from "../Loading";
import toast from "react-hot-toast";

function UpdateCandidateModal({
  setIsModalOpen,
  IsModalOpen,
  onModalClose,
  editedCandidateData,
  setEditedCandidateData,
  renderData,
  setRenderData,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleInterviewStatusChange = (event) => {
    const newStatus = event.target.value;
    const capitalizedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    setEditedCandidateData({ ...editedCandidateData, interviewStatus: capitalizedStatus });
  };

  const handleFeedbackChange = (event) => {
    const newFeedback = event.target.value;
    setEditedCandidateData({ ...editedCandidateData, feedback: newFeedback });
  };

 

  const handleRatingChange = (event) => {
    const newRating = event.target.value;
    setEditedCandidateData({
      ...editedCandidateData,
      rating: parseInt(newRating, 10) || 0,
    });
  };
  
  const handleSuccess = async () => {
    try {
      setIsLoading(true);
      console.log(editedCandidateData);
      const response = await updateCandidate(editedCandidateData);
      if (response) {
        setIsLoading(true);
        setIsModalOpen(false);
        if (onModalClose) {
          onModalClose();
        }
        toast.success("Candidate Updated successfully");
        setRenderData((prev) => !prev);
      }
    } catch (error) {
      console.log("Error :", error);
      console.error("Detailed response:", error.response);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Transition.Root show={IsModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#A367B1] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-[#A367B1] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <h2 className="text-lg font-semibold">
                        update Candidate:
                      </h2>
                      <div className="mt-4">
                        <label htmlFor="interviewStatus">
                          Interview Status:
                        </label>
                        <input
                          id="interviewStatus"
                          name="interviewStatus"
                          type="text"
                          className="w-full mb-4 block outline-none border border-gray-200 rounded-md py-1.5 px-4"
                          value={editedCandidateData?.interviewStatus}
                          onChange={handleInterviewStatusChange}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="interviewFeedback">
                          Interview Feedback:
                        </label>
                        <input
                          id="interviewFeedback"
                          name="interviewFeedback"
                          type="text"
                          className="w-full mb-4 block outline-none border border-gray-200 rounded-md py-1.5 px-4"
                          value={editedCandidateData?.feedback}
                          onChange={handleFeedbackChange}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="rating">Rating : (Enter 1 to 5 )</label>
                        <input
                          id="rating"
                          name="rating"
                          type="text"
                          className="w-full mb-4 block outline-none border border-gray-200 rounded-md py-1.5 px-4"
                          value={editedCandidateData?.rating}
                          onChange={handleRatingChange}
                        />
                      </div>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-[#392467] px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto"
                        onClick={() => handleSuccess()}
                      >
                        Update Candidate
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
}
export default UpdateCandidateModal;
