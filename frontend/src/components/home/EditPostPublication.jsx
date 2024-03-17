import { FaSpinner, FaImage, FaShare } from "react-icons/fa6";
import useEditPostPublication from "../../hooks/useEditPostPublication.js";

const EditPostPublication = () => {
  const {
    formData,
    loading,
    handleInputChange,
    handleImageChange,
    handleFormSubmit,
  } = useEditPostPublication();

  return (
    <div className="create shadow-md">
      <form onSubmit={handleFormSubmit}>
        <div className="top">
          <img src={profile?.avatar} alt="" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="What's on your mind John Doe?"
            required
          />
        </div>
        <hr />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Selected Image"
            className="img_preview"
          />
        )}
        <div className="bottom">
          <label className="custom-button">
            <FaImage />
            <input
              type="file"
              className="file-input"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button type="submit" className="share_btn" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner className="loading" />
                Loading...
              </>
            ) : (
              <>
                <FaShare /> Share
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPublication;
