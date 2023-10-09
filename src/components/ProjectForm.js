import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, storage , auth} from "../firebase"; // Import the Firebase
import "../../src/style/projectwork.css";
import "../style/projectwork.css";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parentsName, setParentsName] = useState("");
  const [image, setImage] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [toolsTech, setToolsTech] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status message
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    // Handle file upload and set the "image" state
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleLogout = () => {
    // Logout the user
    auth.signOut().then(() => {
      // Handle successful logout
      console.log("User logged out");
      // Navigate to the login page
      navigate("/signup"); 
    }).catch((error) => {
      // Handle error
      console.error("Error logging out:", error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate that all fields are filled out
      if (
        !name ||
        !email ||
        !parentsName ||
        !image ||
        !projectTitle ||
        !toolsTech
      ) {
        setSubmissionStatus("Please fill out all fields.");
        return;
      }
      // Upload the image to Firebase Storage
      const imageRef = storage.ref().child(`images/${image.name}`);
      await imageRef.put(image);

      // Get the URL of the uploaded image
      const imageUrl = await imageRef.getDownloadURL();

      // Store the form data in the Realtime Database
      await database.ref("projects").push({
        name,
        email,
        parentsName,
        imageUrl,
        projectTitle,
        toolsTech,
      });

      // Clear the form fields after submission
      setName("");
      setEmail("");
      setParentsName("");
      setImage(null);
      setProjectTitle("");
      setToolsTech("");

      // Set the submission status to success
      setSubmissionStatus("Project Submitted");

      // Handle success or navigation to another page
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error

      // Set the submission status to error message
      setSubmissionStatus("Error submitting the project");
    }
  };

  return (
    <div>
       <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h2>Project Submission Form</h2>
      {submissionStatus && (
        <div className="error-message">{submissionStatus}</div>
      )}
      <form onSubmit={handleSubmit} className="custom-form">
        <label>
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="custom-input"
          />
        </label>
        <br />
        <label>
          Your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
          />
        </label>
        <br />
        <label>
          Parent's Name:
          <input
            type="text"
            value={parentsName}
            onChange={(e) => setParentsName(e.target.value)}
            className="custom-input"
          />
        </label>
        <br />
        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="custom-input"
          />
        </label>
        <br />
        <label>
          Project Title:
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="custom-input"
          />
        </label>
        <br />
        <label>
          Tools and Technology:
          <textarea
            value={toolsTech}
            onChange={(e) => setToolsTech(e.target.value)}
            className="custom-input"
          />
        </label>
        <br />
        <button type="submit" className="custom-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
