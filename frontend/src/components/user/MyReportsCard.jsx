
import { FaEdit, FaTrash } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useReports } from "../../contexts/ReportContext";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyReportCard = ({ report }) => {
  const { deleteReport } = useReports()
  dayjs.extend(relativeTime);
  const isNew = dayjs().diff(dayjs(report.createdAt), 'minute') < 15;
  const navigate = useNavigate()

  const handleDelete = (id) => {

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This report will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          deleteReport(report._id)

          // ✅ Success alert
          Swal.fire('Deleted!', 'The report has been removed.', 'success');
        }
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to delete Report!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };


  return (
    <div className="p-4 bg-white border-l-4 border-red-500 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 space-y-4 relative">

      {isNew && (
        <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
          New
        </span>
      )}

      <div className="flex items-center mt-3 justify-between">
        <h2 className="text-2xl font-bold text-red-600">
          {report.disasterType}
        </h2>
        <h3 className="text-lg text-gray-500">{report.address.city}</h3>


        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/user/edit-report/${report._id}`, { state: { report } })}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Edit report"

          >
            <FaEdit />
          </button>
          <button
            onClick={(e) => handleDelete(e)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete report"
          >
            <FaTrash />
          </button>
        </div>

      </div>

      <p className="text-gray-700">{report.description}</p>

      <div className="flex items-center justify-between">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">
          Severity: {report.severity}
        </span>

        <span className={`px-3 py-1 rounded-md text-sm font-semibold 
          ${report.status === "Resolved"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}>
          {report.status}
        </span>
      </div>

      <div className='flex justify-between '>
        <p className="text-sm text-gray-600">
          Reported By: <span className="font-medium text-black">{report.reportedBy?.name || "Unknown"}</span>
        </p>

        <p className="text-sm text-gray-500">
          Reported: <span className="font-medium">{dayjs(report.createdAt).fromNow()}</span>
        </p>
      </div>

      <div className="flex items-center justify-between text-blue-600 font-medium underline hover:underline-offset-2">

        <button onClick={() => navigate('report-picture')}>Report Picture</button>

        <button onClick={() => navigate('report-video')}>Report Video</button>

      </div>
    </div>
  );
};

export default MyReportCard;
