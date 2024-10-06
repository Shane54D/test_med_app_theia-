import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './ReportsLayout.css'; // Make sure to create a CSS file for styling if needed

// Sample data for the reports
const initialReports = [
  { id: 1, doctorName: "Dr. John Smith", speciality: "Cardiology", pdfUrl: "/path/to/report1.pdf" },
  { id: 2, doctorName: "Dr. Jane Doe", speciality: "Dermatology", pdfUrl: "/path/to/report2.pdf" },
  { id: 3, doctorName: "Dr. Emily Johnson", speciality: "Pediatrics", pdfUrl: "/path/to/report3.pdf" }
];

const ReportsLayout = () => {
  const [reports] = useState(initialReports);

  const handleDownloadReport = (pdfUrl) => {
    // This will trigger the browser to download the file
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
    link.click();
  };

  return (
    <div className="reports-layout">
      <h1>Reports</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <Popup
                  trigger={<button className="btn-view-report">View Report</button>}
                  modal
                  closeOnDocumentClick
                >
                  {(close) => (
                    <div className="popup-content">
                      <h2>Report for {report.doctorName}</h2>
                      <p>Specialty: {report.speciality}</p>
                      <p>Report content goes here...</p>
                      <button className="btn-close" onClick={close}>
                        Close
                      </button>
                    </div>
                  )}
                </Popup>
              </td>
              <td>
                <button className="btn-download-report" onClick={() => handleDownloadReport(report.pdfUrl)}>
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
